const express = require('express');
const { submitData } = require('./controllers/gSheetController'); // Corrected path

const app = express();

app.use(express.json());
app.use(express.static('public'));

app.post('/submit', submitData);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});