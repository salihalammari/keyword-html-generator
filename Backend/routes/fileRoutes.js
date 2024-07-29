const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { processKeywords } = require('../controllers/ControllerKeyword');


const uploadDir = path.join(__dirname, '../uploads')
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true});
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Destination Path:', uploadDir); //debug
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const filename = `${Date.now()}-${file.originalname}`;
        console.log('Filename:', filename); //debug
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only .xlsx files are allowed.'), false);
    }

};

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
    
 });

//file upload endpoint
router.post('/', upload.single('file'), async (req, res) => {
    try{
        if(!req.file){
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const filePath = req.file.path;
        await processKeywords(filePath);
        //fs.unlinkSync(filePath);
        res.json({ message: 'file upload and keyword processed successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'server error' });
    }
});

module.exports = router;
