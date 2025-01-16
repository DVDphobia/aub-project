const { google } = require('googleapis');
require('dotenv').config();

const client_email = process.env.GOOGLE_CLIENT_EMAIL;
const private_key = process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : null; // Handle newline characters in the private key
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const auth = new google.auth.JWT(client_email, null, private_key, SCOPES);
const sheets = google.sheets({ version: 'v4', auth });

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const RANGE_NAME = 'Sheet1!A:E';

async function submitData(req, res) {
    try {
        const { question, answer } = req.body;
        const values = [[question, answer]];
        const resource = { values };
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE_NAME,
            valueInputOption: 'RAW',
            resource,
        });
        console.log('Google Sheets API response:', response);
        res.json({ message: 'Data submitted successfully' });
    } catch (error) {
        console.error('Error submitting data:', error);
        res.status(500).json({ message: 'Error submitting data', error: error.message });
    }
}

module.exports = { submitData };