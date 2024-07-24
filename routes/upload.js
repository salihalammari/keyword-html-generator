const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { processKeywords } = require('../controllers/keywordController');


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/');
    },
    filename: function (req, file, cd) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
    try{
        const filePath = req.file.path;
        await processKeywords(filePath);
        res.json({ message: 'file upload and keyword processed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'internal server error' });
    }
});


module.exports = router;