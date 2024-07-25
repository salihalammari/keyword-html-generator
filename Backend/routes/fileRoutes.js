const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { processKeywords } = require('../controllers/ControllerKeyword');


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)){
            fs.mkdirSync(uploadDir, { recursive: true});
        }
        console.log('Destination Path:', uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        console.log('Filename:', filename);
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

//file upload endpoint
router.post('/', upload.single('file'), async (req, res) => {
    try{
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
