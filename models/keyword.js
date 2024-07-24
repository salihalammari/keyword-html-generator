const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    htmlContent: {
        type: String,
        required: true
    }
}, { timestamps: true });
  
module.exports = mongoose.model('Keyword', keywordSchema);