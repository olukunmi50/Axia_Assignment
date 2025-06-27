const express = require('express');
const router = express.Router();

const { submitKYC } = require('../Controllers/Kyc.Controllers');
const authorize = require('../Middleware/authMiddleware');


router.post('/submit', authorize, submitKYC);


module.exports = router;
