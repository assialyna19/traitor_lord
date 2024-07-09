const express = require('express');
const router = express.Router();
const authentifcontroller = require('../controllers/autentifcont');
const authmiddleware = require('../middlewares/authmiddlewar');

router.get('/', authentifcontroller.login);

module.exports = router;
