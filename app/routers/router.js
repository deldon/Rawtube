const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const uploadController = require('../controllers/uploadController')


// UPLOAD
router.post('/upload', controllerHandler(uploadController.uploadVideo))

module.exports = router;
