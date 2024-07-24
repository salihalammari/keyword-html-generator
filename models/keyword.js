const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true,
        unique: true,
        htmlContent: String
    },   
  });
  
  const Keyword = mongoose.model('Keyword', keywordSchema);