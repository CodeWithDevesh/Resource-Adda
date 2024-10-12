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
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:5173", // Replace this with your frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

app.use(
    cors({
        origin: "http://localhost:5173", // Replace this with your frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.get("/server/files", async (req, res) => {
    const { branch, sem, subject, unit } = req.query;

    if (!branch || !sem) {
        return res.status(400).send("Please provide both branch and sem.");
    }

    try {
        // Check if 'branch' is an array (multiple branches) or a single branch
        const branches = Array.isArray(branch) ? branch : [branch];

        // Create the base search parameters for semester, subject, and unit
        const searchPara = { sem };
        if (subject) searchPara.subject = subject;
        if (unit) searchPara.unit = unit;
        console.log(branches);
        let files;

        // If multiple branches are provided, find files common across the branches
        if (branches.length > 1) {
            // Fetch files that are common to the provided branches
            const documents = await Document.find({
                branch: { $in: branches },
                ...searchPara,
            });
            console.log(documents);

            // Create a map to track file occurrences across branches
            const fileMap = new Map();

            documents.forEach((doc) => {
                if (fileMap.has(doc.fileUrl)) {
                    const fileData = fileMap.get(doc.fileUrl);
                    fileData.count += 1;
                    fileMap.set(doc.fileUrl, fileData);
                } else {
                    fileMap.set(doc.fileUrl, {
                        fileUrl: doc.fileUrl,
                        fileName: doc.fileName,
                        branch: doc.branch,
                        sem: doc.sem,
                        subject: doc.subject,
                        uploadedAt: doc.uploadedAt,
                        unit: doc.unit,
                        count: 1, // Initialize count to 1
                    });
                }
            });

            // Only keep files that are common to all branches
            files = Array.from(fileMap.values()).filter(
                (file) => file.count === branches.length
            );
        } else {
            // If only one branch is provided, use the current functionality
            files = await Document.find({ branch: branches[0], ...searchPara });
        }

        // Send the response
        res.status(200).json({
            message: `Files for branch(es): ${branches.join(
                ", "
            )}, sem: ${sem}`,
            files,
        });
    } catch (error) {
        console.error("Error fetching files from MongoDB:", error);
        res.status(500).send("Error retrieving files.");
    }
});

app.delete("/server/delete", authenticateJWT, async (req, res) => {
    const { fileUrl, branch } = req.body; // Accept both fileUrl and branch from the body

    if (!fileUrl || !branch) {
        return res
            .status(400)
            .json({ error: "File URL and branch are required" });
    }

    try {
        // Check if branch is an array or not
        const branches = Array.isArray(branch) ? branch : [branch];

        // Find all documents that reference this file URL
        const documents = await Document.find({ fileUrl });

        if (!documents.length) {
            return res.status(404).json({ error: "File not found" });
        }

        // Filter documents that match the branches to be deleted
        const documentsToDelete = documents.filter((doc) =>
            branches.includes(doc.branch)
        );

        if (!documentsToDelete.length) {
            return res.status(404).json({
                error: "No documents found for the specified branches",
            });
        }

        // Delete documents for the specified branches
        await Document.deleteMany({
            fileUrl,
            branch: { $in: branches },
        });
        console.log("Documents deleted from MongoDB for branches:", branches);

        // Check if there are any remaining documents that still reference the file
        const remainingDocuments = await Document.find({ fileUrl });

        // Only delete the file from GCP if no other branches reference it
        if (!remainingDocuments.length) {
            const fileName = fileUrl.split("/").pop(); // Adjust this depending on the structure of your file URL

            const bucket = storage.bucket(bucketName);
            const file = bucket.file(fileName);

            await file.delete();
            console.log("File deleted from Google Cloud Storage");
        } else {
            console.log("File retained because other branches reference it.");
        }

        return res.status(200).json({
            message: "File deleted successfully for the specified branches",
        });
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
    bcrypt
        .compare(ADMIN_PASS, process.env.PASSWORD)
        .then(async () => {
            if (!username || !password) {
                res.sendStatus(400);
                return;
            }
            try {
                const hashed = await bcrypt.hash(password, 10);
                const admin = new adminDoc({ username, password: hashed });
                await admin.save();
                return res.sendStatus(201);
            } catch {
                return res.sendStatus(500);
            }
        })
        .catch((err) => {
            return res.status(403).send("Forbidden");
        });
});

app.get("/server/pending-requests", authenticateJWT, async (req, res) => {
    try {
        const pendingRequests = await Contribution.find({ status: "pending" });
        res.status(200).json(pendingRequests);
    } catch (error) {
        console.error("Error fetching pending requests:", error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/server/approve", authenticateJWT, async (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

io.use((socket, next) => {
    const token = socket.handshake.auth.token; // Get token from handshake
    if (!token) {
        return next(); // Proceed without setting `socket.username`
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error")); // Invalid token
        }
        socket.username = decoded.username; // Attach username to socket
        next(); // Proceed if token is valid
    });
});

const activeUploads = {}; // To keep track of active upload streams

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("uploadFileChunk", async (data) => {
        const {
            fileBuffer,
            branch,
            sem,
            subject,
            unit,
            fileName,
            offset,
            fileSize,
            id,
            type,
        } = data;

        if (
            !fileBuffer ||
            !branch ||
            !sem ||
            !subject ||
            !unit ||
            !fileName ||
            offset === undefined ||
            !fileSize ||
            !id ||
            !type
        ) {
            socket.emit("error", "Missing required metadata or file.");
            return;
        }

        if (type == "contribute" && !data.email) {
            socket.emit("error", "Missing email");
        }

        // Admin uploads: Require valid JWT authentication
        if (type === "upload" && !socket.username) {
            socket.emit("error", "Unauthorized admin upload.");
            return;
        }

        // If this is the first chunk, create the write stream
        if (!activeUploads[id]) {
            const blob = bucket.file(id); // Store chunks in the same file using unique ID
            const blobStream = blob.createWriteStream({
                resumable: true,
                contentType: "application/octet-stream",
            });
            activeUploads[id] = {};
            activeUploads[id].blobStream = blobStream;
            activeUploads[id].socketId = socket.id;
            activeUploads[id].offset = 0;
            activeUploads[id].fileName = fileName;
            activeUploads[id].fileSize = fileSize;
        }

        const buffer = Buffer.from(new Uint8Array(fileBuffer));
        activeUploads[id].offset = offset;
        activeUploads[id].blobStream.write(buffer, (err) => {
            if (err) {
                console.error("Error writing chunk:", err);
                socket.emit("error", "Error writing chunk.");
                return;
            }

            const uploadProgress = ((offset + buffer.length) / fileSize) * 100;
            socket.emit("uploadProgress", uploadProgress);

            if (offset + buffer.length >= fileSize) {
                try {
                    activeUploads[id].blobStream.end(); // Close the stream

                    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${id}`;
                    let fileRecords = [];

                    if (type == "upload") {
                        const branches = Array.isArray(branch)
                            ? branch
                            : [branch];

                        for (br of branches)
                            fileRecords.push(
                                new Document({
                                    fileUrl: publicUrl,
                                    branch: br,
                                    sem,
                                    fileName,
                                    subject,
                                    unit,
                                })
                            );
                    } else {
                        const branches = Array.isArray(branch)
                            ? branch
                            : [branch];
                        for (br of branches)
                            fileRecords.push(
                                Contribution({
                                    fileUrl: publicUrl, // Google Cloud Storage URL
                                    branch,
                                    sem,
                                    filename: fileName, // UUID file name
                                    subject,
                                    unit,
                                    email: data.email,
                                })
                            );
                    }

                    for (fr of fileRecords)
                        fr.save()
                            .then(() => {
                                socket.emit("uploadSuccess", {
                                    message: "File uploaded successfully!",
                                    fileUrl: publicUrl,
                                });

                                delete activeUploads[id];
                            })
                            .catch((err) => {
                                console.error("Error saving file record:", err);
                                socket.emit(
                                    "error",
                                    "Error saving file metadata."
                                );
                            });
                } catch (err) {
                    socket.emit("error", err);
                }
            }

            socket.emit("chunkUploaded");
        });
    });

    // Handle client disconnection
    socket.on("disconnect", async () => {
        console.log("Client disconnected");
        const clientUploads = Object.keys(activeUploads).filter(
            (id) => activeUploads[id].socketId === socket.id
        );
        for (const id of clientUploads) {
            if (!activeUploads[id]) continue;

            try {
                await new Promise((resolve, reject) => {
                    activeUploads[id].blobStream.end((err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            } catch (err) {
                console.log(
                    `Failed to close the writestream for ${id}: ${err}`
                );
            }

            if (activeUploads[id].offset < activeUploads[id].fileSize)
                try {
                    console.log(`Upload for file with id ${id} failed`);
                    const bucket = storage.bucket(bucketName);
                    const file = bucket.file(id);
                    await file.delete();
                    console.log("File deleted from Google Cloud Storage");
                } catch (err) {
                    console.log(
                        `Failed to delete the incomplete file with id ${id}: ${err}`
                    );
                }

            delete activeUploads[id];
        }
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
