const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path')
const fileRoutes = require('./routes/fileRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();
const Keyword = require('./models/Keyword');


const app = express();

const uploadDir = path.join(__dirname, 'uploads');
const htmlDirectory = path.join(__dirname, 'public/html');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

if (!fs.existsSync(htmlDirectory)) {
  fs.mkdirSync(htmlDirectory, { recursive: true });
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

const upload = multer({ storage });

//Middleware setup
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/html', express.static(htmlDirectory));

//Routes
app.use('/upload', fileRoutes); //file Routes handles file uploads
app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err.message));

//List keywords and provide download links
app.get('/keywords', async (req, res) => {
  try {
      const { search = ''} = req.query;
      const keywords = await Keyword.find({keyword: new RegExp(search, 'i')});
      const htmlLinks = keywords.map(keyword => ({
        keyword: keyword.keyword,
        link: `/html/${keyword.keyword}.html`
      }))
      res.json(htmlLinks);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching keywords', error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
