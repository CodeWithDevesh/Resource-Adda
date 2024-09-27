require('dotenv').config()
const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const { v4: uuidV4 } = require('uuid')
const path = require('path')
const Document = require('./document')
const cors = require('cors');


const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

// Create a new instance of the Google Cloud Storage class
const storage = new Storage();
const bucketName = 'shayog-data'; // Update with your bucket name
const bucket = storage.bucket(bucketName);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',  // Replace this with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Set up Multer to handle file uploads in memory
const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory before uploading
});

// Endpoint for uploading a file along with metadata (branch, year, subject)
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Extract the metadata from the request body
  const { branch, sem, subject } = req.body;

  if (!branch || !sem || !subject) {
    return res.status(400).send('Missing metadata: branch, year, or subject.');
  }

  // Log the received metadata (for verification purposes)
  console.log(`Received metadata - Branch: ${branch}, Sem: ${sem}, Subject: ${subject}`);

  // Set up Google Cloud Storage file upload
  const extension = path.extname(req.file.originalname);
  const id = uuidV4() + extension;
  const blob = bucket.file(id);
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  // Handle stream errors
  blobStream.on('error', (err) => {
    console.error(err);
    res.status(500).send('Unable to upload file, something went wrong.');
  });


  // On successful upload, send back a response with file and metadata
  blobStream.on('finish', async () => {
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
    try {
      // Save file metadata to MongoDB
      const fileRecord = new Document({
        fileUrl: publicUrl,  // Google Cloud Storage URL
        branch,
        sem,
        fileName: req.file.originalname,  // UUID file name
        subject,
      });

      await fileRecord.save();  // Save to MongoDB

      res.status(200).json({
        message: 'Success! File uploaded',
        fileUrl: publicUrl,
        metadata: {
          branch,
          sem,
          subject,
          fileName: req.file.originalname
        },
      });
    } catch (error) {
      console.error('Error saving to MongoDB:', error);
      res.status(500).send('Error saving file metadata.');
    }
  });

  // Upload file buffer to Google Cloud Storage
  blobStream.end(req.file.buffer);
});

app.get('/files', async (req, res) => {
  const { branch, sem, subject } = req.query;

  if (!branch || !sem) {
    return res.status(400).send('Please provide both branch and sem.');
  }

  const searchPara = {branch, sem};
  if(subject)
      searchPara.subject = subject

  try {
    // Find files by branch and sem
    const files = await Document.find(searchPara);

    if (files.length === 0) {
      return res.status(404).send('No files found for the given branch and sem.');
    }

    res.status(200).json({
      message: `Files for branch: ${branch}, sem: ${sem}`,
      files,
    });
  } catch (error) {
    console.error('Error fetching files from MongoDB:', error);
    res.status(500).send('Error retrieving files.');
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
