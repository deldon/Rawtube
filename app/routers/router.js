const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const uploadController = require('../controllers/uploadController');
const streamController = require('../controllers/streamController');
const videoController = require('../controllers/videoController');
const userController = require('../controllers/userController');

const security = require('../middleware/security');
const likeController = require('../controllers/likeController');
const commentController = require('../controllers/commentController');



// VIDEO
/**
 * GET /video/{position}
 * @summary Give a video by relevance with a presise position
 * @tags VIDEO
 * @param {integer} position.path.required - position param 
 * @return {object} 200 - success response
 */
router.get('/video/:position/',security.pass, controllerHandler(videoController.getAllVideoByRelevance)); //new

/**
 * GET /video/{position}/{userId}
 * @summary gives the video of a user with a presized position
 * @tags VIDEO
 * @param {integer} position.path.required - position param 
 * @param {integer} userId.path.required - user_id param 
 * @return {object} 200 - success response
 */
router.get('/video/:position/:userId',security.pass, controllerHandler(videoController.getAllVideoByUserById)); //new

/**
 * DELETE /video/{videoId}
 * @summary Delete video by id
 * @tags VIDEO
 * @param {integer} videoId.path.required - position param 
 * @return {object} 200 - success response
 * @security BearerAuth
 */
router.delete('/video/:videoId',security.check, controllerHandler(videoController.deleteVideoById)) //new

// CHANNEL
/**
 * GET /channel/{userId}
 * @summary Give info on the user and the list of these videos
 * @tags CHANNEL
 * @param {integer} userId.path.required - user_id param 
 * @return {object} 200 - success response
 */
router.get('/channel/:userId',controllerHandler(videoController.getAllVideoByUserId)) //new


// UPLOAD
router.post('/upload',security.check, controllerHandler(uploadController.uploadVideo)); //new

//STREAM
router.get('/video', controllerHandler(streamController.stream)); //new


// LIKE
router.post('/like/add/:videoId',security.check,controllerHandler(likeController.addLike)); // news

//USER
router.post('/user/login', controllerHandler(userController.login)); //new
router.post('/user/register', controllerHandler(userController.addUser)); //new

// COMMENT
router.get('/comment/:videoId', controllerHandler(commentController.getAllCommentByVideoId))
router.post('/comment/:videoId',security.check, controllerHandler(commentController.postCommentByVideoId))


//
router.patch('/user/:user_id', controllerHandler(userController.updateUser));
router.delete('/user/:user_id', controllerHandler(userController.deleteUser));



module.exports = router;
