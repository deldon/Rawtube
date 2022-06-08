const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const uploadController = require('../controllers/uploadController');
const streamController = require('../controllers/streamController');
const myVideoController = require('../controllers/myVideoController');
const videoController = require('../controllers/videoController');


// VIDEO
router.get('/',controllerHandler(videoController.getVideoByRelevance))
router.get('/watch',controllerHandler(videoController.getVideoById))

// MY VIDEO
router.post('/add_video',controllerHandler(myVideoController.addVideo));

// UPLOAD
router.get('/upload', controllerHandler(uploadController.uploadTemplate));
router.post('/upload', controllerHandler(uploadController.uploadVideo));

//STREAM
router.get('/video', controllerHandler(streamController.stream));

module.exports = router;
