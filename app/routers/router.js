const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const uploadController = require('../controllers/uploadController');
const streamController = require('../controllers/streamController');
const videoController = require('../controllers/videoController');
const userController = require('../controllers/userController');

const isAuthenticated = require('../middleware/security');

// -------- LOGIN -------- //
/**
 * POST /login/
 * @summary This is the summary of the endpoint
 * @tags LOGIN
 * @return {object} 200 - success response
 */




// VIDEO
router.get('/video/:position/', controllerHandler(videoController.getAllVideoByRelevance)); //new
router.get('/video/:position/:userId', controllerHandler(videoController.getAllVideoByUserById)); //new

router.delete('/video/:videoId', controllerHandler(videoController.deleteVideoById)) //new

// CHANNEL
router.get('/channel/:userId',controllerHandler(videoController.getAllVideoByUserId)) //new



// UPLOAD
router.post('/upload', controllerHandler(uploadController.uploadVideo));

//STREAM
router.get('/video', controllerHandler(streamController.stream));



//USER

router.post('/user/login', controllerHandler(userController.login)); //new
router.post('/user/register', controllerHandler(userController.addUser)); //new


router.patch('/user/:user_id', controllerHandler(userController.updateUser));
router.delete('/user/:user_id', controllerHandler(userController.deleteUser));



module.exports = router;
