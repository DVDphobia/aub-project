const express = require('express');
const router = express.Router();
const { submitData } = require('../controllers/gSheetController');

router.post('/submit', submitData);

module.exports = router;