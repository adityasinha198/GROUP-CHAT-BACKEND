const path = require('path');

const express = require('express');

const message = require('../controllers/message');
const authenticate = require('../middleware/auth')

const router = express.Router();

router.post('/message',authenticate.authenticate,message.postmessage)



module.exports = router