const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path')
const fileRoutes = require('./routes/fileRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
const upload = multer({dest: 'upload/'}); //multer configuration for file upload

const app = express();

//Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
if(!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

mongoose.connect(process.env.MONGO_URI,{
    // serverSelectionTimeoutMS: 30000, // 30 seconds
    // socketTimeoutMS: 45000, // 45 seconds
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err.message));

app.use('/uploads', fileRoutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
