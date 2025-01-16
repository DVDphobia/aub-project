const express = require('express');
const router = express.Router();
const { submitData } = require('../controllers/googleSheetController');

router.post('/submit', submitData);

module.exports = router;