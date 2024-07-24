const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({
    keyword: String,
    htmlContent: String
  });
  
  const Keyword = mongoose.model('Keyword', keywordSchema);