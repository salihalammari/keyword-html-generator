const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({dest: 'upload/' });

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

app.post('/upload', upload.single('file'), (rep, res) => {
    res.json({message: 'file upload successfully' });
});
