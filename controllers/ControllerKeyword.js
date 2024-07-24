const fs = require('fs');
const path = require('path');
const Keyword = require('../models/Keyword');

async function processKeywords(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const keywords = data.split('\n').map(keyword => keyword.trim()).filter(Boolean); // Trim and filter out empty lines

        for (let keyword of keywords) {
            //const trimmedkeyword = keyword.trim(); //remove whitespace
            const htmlContent = `<html><head><title>${keyword}</title></head><body><h1>${keyword}</h1></body></html>`;
            
            await Keyword.create({ keyword, htmlContent }); // Save keyword and HTML content to MongoDB
            console.log(`Saved keyword: ${keyword}`);
        }
    } catch (err) {
        console.error(`Error processing keywords: ${err.message}`);
        throw err;
    } finally {
        fs.unlinkSync(filePath); // Cleanup: Delete the uploaded file after processing
    }
}

module.exports = {
    processKeywords
};