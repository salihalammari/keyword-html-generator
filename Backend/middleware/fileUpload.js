// const multer = require('multer');

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'xlsx/plain') {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type, only .xlsx files are allowed'), false);
//   }
// };

// const upload = multer({
//   dest: 'uploads/',
//   fileFilter,
//   limits: { fileSize: 1024 * 1024 }, // Limit file size to 1MB
// });

// module.exports = upload;