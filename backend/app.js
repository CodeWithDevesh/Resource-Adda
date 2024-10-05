require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { Storage } = require("@google-cloud/storage");
const { v4: uuidV4 } = require("uuid");
const path = require("path");
const Document = require("./document");
const adminDoc = require("./admin");
const Contribution = require("./contrbution");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const http = require("http");
const socketIO = require("socket.io");
const uri = process.env.MONGO_URI;
const clientOptions = {
    serverApi: { version: "1", strict: true, deprecationErrors: true },
};
async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(uri);
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);

// Create a new instance of the Google Cloud Storage class
const storage = new Storage();
const bucketName = process.env.BUCKET_NAME; // Update with your bucket name
const bucket = storage.bucket(bucketName);

const app = express();
const port = process.env.PORT || 3333;

const server = http.createServer(app);
const io = socketIO(server);

app.use(
    cors({
        origin: "http://localhost:5173", // Replace this with your frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ limit: "200mb", extended: false }));
app.use(express.json({ limit: "200mb" }));

// Set up Multer to handle file uploads in memory
const upload = multer({
    storage: multer.memoryStorage(), // Store file in memory before uploading
    limits: { fileSize: 200 * 1024 * 1024 },
});

// The middleware for authentication of admins
function authenticateJWT(req, res, next) {
    const token =
        req.headers.authorization && req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.sendStatus(403); // Forbidden
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, username) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        next();
    });
}

app.get("/server/validate-token", (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).send("No token provided");
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).send("Invalid token");
        }
        res.send("Token is valid");
    });
});

// Endpoint for uploading a file along with metadata (branch, year, subject)
app.post(
    "/server/upload",
    authenticateJWT,
    upload.single("file"),
    async (req, res) => {
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }
        // Extract the metadata from the request body
        const { branch, sem, subject, unit } = req.body;

        if (!branch || !sem || !subject || !unit) {
            return res
                .status(400)
                .send("Missing metadata: branch, sem, subject or unit.");
        }

        // Log the received metadata (for verification purposes)
        console.log(
            `Received metadata - Branch: ${branch}, Sem: ${sem}, Subject: ${subject}, Unit: ${unit}`
        );

        // Set up Google Cloud Storage file upload
        const extension = path.extname(req.file.originalname);
        const id = uuidV4() + extension;
        const blob = bucket.file(id);
        const blobStream = blob.createWriteStream({
            resumable: false,
        });

        // Handle stream errors
        blobStream.on("error", (err) => {
            console.error(err);
            res.status(500).send(
                "Unable to upload file, something went wrong."
            );
        });

        // On successful upload, send back a response with file and metadata
        blobStream.on("finish", async () => {
            const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
            try {
                // Save file metadata to MongoDB
                const fileRecord = new Document({
                    fileUrl: publicUrl, // Google Cloud Storage URL
                    branch,
                    sem,
                    fileName: req.file.originalname, // UUID file name
                    subject,
                    unit,
                });

                await fileRecord.save(); // Save to MongoDB

                res.status(200).json({
                    message: "Success! File uploaded",
                    fileUrl: publicUrl,
                    metadata: {
                        branch,
                        sem,
                        subject,
                        unit,
                        fileName: req.file.originalname,
                    },
                });
            } catch (error) {
                console.error("Error saving to MongoDB:", error);
                res.status(500).send("Error saving file metadata.");
                try {
                    const bucket = storage.bucket(bucketName);
                    const file = bucket.file(blob.name);

                    await file.delete();
                    console.log("Deleted the uploaded file");
                } catch {
                    console.log("Failed to delete the uploaded file");
                }
            }
        });

        // Upload file buffer to Google Cloud Storage
        blobStream.end(req.file.buffer);
    }
);

app.get("/server/files", async (req, res) => {
    const { branch, sem, subject, unit } = req.query;

    if (!branch || !sem) {
        return res.status(400).send("Please provide both branch and sem.");
    }

    const searchPara = { branch, sem };
    if (subject) searchPara.subject = subject;
    if (unit) searchPara.unit = unit;

    try {
        // Find files by branch and sem
        const files = await Document.find(searchPara);

        res.status(200).json({
            message: `Files for branch: ${branch}, sem: ${sem}`,
            files,
        });
    } catch (error) {
        console.error("Error fetching files from MongoDB:", error);
        res.status(500).send("Error retrieving files.");
    }
});

app.delete("/server/delete", authenticateJWT, async (req, res) => {
    const { fileUrl } = req.body;

    if (!fileUrl) {
        return res.status(400).json({ error: "File URL is required" });
    }

    try {
        const document = await Document.findOne({ fileUrl });
        if (!document) {
            return res.status(404).json({ error: "File not found" });
        }

        const fileName = fileUrl.split("/").pop(); // Adjust this depending on the structure of your file URL

        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);

        await file.delete();
        console.log("File deleted from Google Cloud Storage");

        await Document.deleteOne({ fileUrl });
        console.log("Document deleted from MongoDB");

        return res.status(200).json({ message: "File deleted successfully" });
    } catch (error) {
        console.error("Error deleting file:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/server/subjects", async (req, res) => {
    const { branch, sem } = req.query;
    if (!branch || !sem) {
        return res.status(400).send("Please provide both branch and sem.");
    }

    try {
        const subjects = await Document.distinct("subject", { branch, sem });
        res.json({ subjects });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post(
    "/server/admin_login",
    express.urlencoded({ extended: false }),
    async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.sendStatus(400);
            return;
        }

        try {
            const user = await adminDoc.findOne({ username });
            if (!user) return res.status(401).send("Invalid credentials");
            if (!(await bcrypt.compare(password, user.password)))
                return res.status(401).send("Invalid credentials");

            console.log("validated");
            const token = jwt.sign({ username }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            res.json({ token });
        } catch {
            res.sendStatus(500);
        }
    }
);

app.post("/server/addAdmin", async (req, res) => {
    const { admin_password: ADMIN_PASS, username, password } = req.body;
    if (!ADMIN_PASS) {
        res.status(403).send("Forbidden");
        return;
    }
    if (await bcrypt.compare(ADMIN_PASS, process.env.PASSWORD)) {
        if (!username || !password) {
            res.sendStatus(400);
            return;
        }
        try {
            const hashed = await bcrypt.hash(password, 10);
            const admin = new adminDoc({ username, password: hashed });
            await admin.save();
        } catch {
            res.sendStatus(500);
            return;
        }
    } else {
        res.status(403).send("Forbidden");
        return;
    }
    res.sendStatus(201);
});

app.post("/server/contribute/", upload.single("file"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const { branch, sem, subject, unit, email } = req.body;

    if (!branch || !sem || !subject || !unit || !email) {
        return res
            .status(400)
            .send("Missing metadata: branch, sem, subject or unit.");
    }

    // Set up Google Cloud Storage file upload
    const extension = path.extname(req.file.originalname);
    const id = uuidV4() + extension;
    const blob = bucket.file(id);
    const blobStream = blob.createWriteStream({
        resumable: false,
    });

    // Handle stream errors
    blobStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Unable to upload file, something went wrong.");
    });

    // On successful upload, send back a response with file and metadata
    blobStream.on("finish", async () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
        try {
            // Save file metadata to MongoDB
            const fileRecord = new Contribution({
                fileUrl: publicUrl, // Google Cloud Storage URL
                branch,
                sem,
                filename: req.file.originalname, // UUID file name
                subject,
                unit,
                email,
            });

            await fileRecord.save(); // Save to MongoDB

            res.status(200).send();
        } catch (error) {
            console.error("Error saving to MongoDB:", error);
            res.status(500).send("Error saving file metadata.");
            try {
                const bucket = storage.bucket(bucketName);
                const file = bucket.file(blob.name);

                await file.delete();
                console.log("Deleted the uploaded file");
            } catch {
                console.log("Failed to delete the uploaded file");
            }
        }
    });

    // Upload file buffer to Google Cloud Storage
    blobStream.end(req.file.buffer);
});

app.get("/server/pending-requests", async (req, res) => {
    try {
        const pendingRequests = await Contribution.find({ status: "pending" });
        res.status(200).json(pendingRequests);
    } catch (error) {
        console.error("Error fetching pending requests:", error);
        res.status(500).json({ message: "Server error" });
    }
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token; // Get token from handshake
    if (!token) {
        return next(new Error("Authentication error")); // No token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error")); // Invalid token
        }
        socket.username = decoded.username; // Attach username to socket
        next(); // Proceed if token is valid
    });
});

io.on("connection", (socket) => {
    console.log("New client connected");

    // Listen for the 'uploadFile' event from the client
    socket.on("uploadFile", async (data) => {
        const { fileBuffer, branch, sem, subject, unit, fileName } = data;

        if (!fileBuffer || !branch || !sem || !subject || !unit || !fileName) {
            socket.emit("error", "Missing required metadata or file.");
            return;
        }

        try {
            // Generate a unique file ID
            const extension = path.extname(fileName);
            const id = uuidV4() + extension;
            const blob = bucket.file(id);
            const blobStream = blob.createWriteStream({
                resumable: false,
            });

            // Stream the file buffer to Google Cloud Storage
            blobStream.end(Buffer.from(fileBuffer, "base64"));

            // On successful upload
            blobStream.on("finish", async () => {
                const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;

                // Save the file metadata to MongoDB
                const fileRecord = new Document({
                    fileUrl: publicUrl, // Google Cloud Storage URL
                    branch,
                    sem,
                    fileName,
                    subject,
                    unit,
                });

                await fileRecord.save(); // Save metadata to MongoDB

                // Emit a success message to the client
                socket.emit("uploadSuccess", {
                    message: "File uploaded successfully!",
                    fileUrl: publicUrl,
                });
            });

            // Handle errors during file upload
            blobStream.on("error", (err) => {
                console.error(err);
                socket.emit("error", "File upload failed.");
            });
        } catch (error) {
            console.error("Error uploading file:", error);
            socket.emit("error", "Error saving file metadata.");
        }
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

//serve static files if other routes does not match
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

// Start the server with Socket.IO
server.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
