const express = require('express');
const { scheduleEmail } = require('../controllers/emailController');

const router = express.Router();

router.post('/schedule', scheduleEmail);

module.exports = router;
