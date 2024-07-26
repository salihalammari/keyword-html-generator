const fs = require('fs');
const path = require('path');
const Keyword = require('../models/Keyword');
const xlsx = require('xlsx');

async function processKeywords(filePath) {
    try {
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        const keywords = data.flat().map(keyword => keyword.toString().trim()).filter(Boolean); // Trim and filter out empty lines
        for (let keyword of keywords) {
            try {
                const existingKeyword = await Keyword.findOne({keyword});

                if (existingKeyword){
                    console.log(`Keyword already exists: ${keyword}`);
                } else {
                    const htmlContent = `<html><head><title>${keyword}</title></head><body><h1>${keyword}</h1></body></html>`;
                    await Keyword.create({ keyword, htmlContent }); // Save keyword and HTML content to MongoDB

                    // Save HTML file
                    const htmlDir = path.join(__dirname, '../public/html');
                    if (!fs.existsSync(htmlDir)) {
                        fs.mkdirSync(htmlDir, { recursive: true });
                    }
                    const htmlPath = path.join(htmlDir, `${keyword}.html`);
                    fs.writeFileSync(htmlPath, htmlContent);
                    console.log(`Saved keyword and HTML: ${keyword}`);
                }
            }catch (err) {
                console.error(`Error saving keyword: ${keyword}. ${err.message}`);
            }
        }
    } catch (err) {
        console.error(`Error processing keywords: ${err.message}`);
        throw err;
    } finally {
        try{
        fs.unlinkSync(filePath); // Cleanup: Delete the uploaded file after processing
        console.log(`Deleted file: ${filePath}`); //debug
        } catch (err) {
            console.error(`Error deleting file: ${err.message}`);
        }
    }
}

module.exports = {processKeywords};
