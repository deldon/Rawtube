const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const uploadController = require('../controllers/uploadController');
const streamController = require('../controllers/streamController');
const myVideoController = require('../controllers/myVideoController');
const videoController = require('../controllers/videoController');
const userController = require('../controllers/userController');

// LOGIN
router.post('/signin/', controllerHandler(userController.login));

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

//USER
router.post('/user', controllerHandler(userController.addUser));
router.patch('/user/:user_id', controllerHandler(userController.updateUser));
router.delete('/user/:user_id', controllerHandler(userController.deleteUser));

module.exports = router;
