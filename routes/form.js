const express = require('express');
const router = express.Router();
const formController = require('../controllers/formcontroller');
const authmiddleware = require('../middlewares/authmiddleware');

router.post('/', formController.createForm);
router.post('/:id/responses', formController.submitResponse);
router.get('/', formController.getForms);

module.exports = router;
