const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const path = require('path')
const upload = multer({dest: 'upload/' }); //multer configuration for file upload
require('dotenv').config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error', err.message));

//define router
const uploadRouter = require('./routes/upload');
app.use('/upload', uploadRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
