const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const uploadController = require('../controllers/uploadController');
const streamController = require('../controllers/streamController');
const myVideoController = require('../controllers/myVideoController');
const videoController = require('../controllers/videoController');
const userController = require('../controllers/userController');

const isAuthenticated = require('../middleware/security');


// LOGIN
router.get('/signin', controllerHandler(userController.signin));
router.post('/login', controllerHandler(userController.login));


// VIDEO
router.get('/', controllerHandler(videoController.getVideoByRelevance));
router.get('/watch',controllerHandler(videoController.getVideoById));

// MY VIDEO
router.get('/myvideo', isAuthenticated, controllerHandler(myVideoController.getAllMyVideo));
router.get('/update/:id', isAuthenticated, controllerHandler(myVideoController.getForUptadeMyVideo));
router.post('/update/:id', isAuthenticated, controllerHandler(myVideoController.UptadeMyVideo));
router.get('/delete/:id', isAuthenticated, controllerHandler(myVideoController.deleteVideo));
router.post('/add_video', isAuthenticated, controllerHandler(myVideoController.addVideo));

// UPLOAD
router.get('/upload/', isAuthenticated , controllerHandler(uploadController.uploadTemplate));
router.post('/upload', isAuthenticated , controllerHandler(uploadController.uploadVideo));

//STREAM
router.get('/video', controllerHandler(streamController.stream));

//USER
router.post('/user', controllerHandler(userController.addUser));
router.patch('/user/:user_id', controllerHandler(userController.updateUser));
router.delete('/user/:user_id', controllerHandler(userController.deleteUser));

module.exports = router;
