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



// ----- VIDEO
/**
 * GET /video/{position}
 * @summary Give a video by relevance with a presise position
 * @tags VIDEO
 * @param {integer} position.path.required - position param 
 * @return {object} 200 - success response
 * @example response - 200 - example success response
 * {
 * 	"video_id": 19,
 * 	"url_file": "http://localhost:5000/video?v=0171454f-10d1-4681-b372-2e67290f29b5.webm",
 * 	"user_id": 2,
 * 	"user_name": "mark",
 * 	"user_url_thumbnail": "http://localhost:5000/userThumbnail/phil.jpg",
 * 	"likes": "1",
 * 	"number_of_comments": "1",
 * 	"user_is_liked": false
 * }
 */
router.get('/video/:position/', security.pass, controllerHandler(videoController.getAllVideoByRelevance)); //new

/**
 * GET /video/{position}/{userId}
 * @summary gives the video of a user with a presized position
 * @tags VIDEO
 * @param {integer} position.path.required - position param 
 * @param {integer} userId.path.required - user_id param 
 * @return {object} 200 - success response
 * @example response - 200 - example success response
 * {
 * 	"video_id": 19,
 * 	"url_file": "http://localhost:5000/video?v=0171454f-10d1-4681-b372-2e67290f29b5.webm",
 * 	"user_id": 2,
 * 	"user_name": "mark",
 * 	"user_url_thumbnail": "http://localhost:5000/userThumbnail/phil.jpg",
 * 	"likes": "1",
 * 	"number_of_comments": "1",
 * 	"user_is_liked": false
 * }
 */
router.get('/video/:position/:userId', security.pass, controllerHandler(videoController.getAllVideoByUserById)); //new

/**
 * GET /video/
 * @summary retrieve the video stream
 * @tags VIDEO
 * @param {string} v.query.required - Video name
 * @return {object} 200 - success response
 */
router.get('/video', controllerHandler(streamController.stream)); //new

/**
 * DELETE /video/{videoId}
 * @summary Delete video by id
 * @tags VIDEO
 * @param {integer} videoId.path.required - position param 
 * @return {object} 200 - success response
 * @security BearerAuth
 */
router.delete('/video/:videoId', security.check, controllerHandler(videoController.deleteVideoById)) //new

// ----- CHANNEL
/**
 * GET /channel/{userId}
 * @summary Give info on the user and the list of these videos
 * @tags CHANNEL
 * @param {integer} userId.path.required - user_id param 
 * @return {object} 200 - success response
 * @example response - 200 - example success response
 *{
 *	"user": {
 *		"id": 1,
 *		"name": "romain",
 * 		"url_thumbnail": "http://localhost:5000/userThumbnail/romain.jpg",
 *		"total_videos": "3",
 *		"total_likes": "3"
 *	},
 *	"videos": [
 *		{
 *			"id": 16,
 *			"url_thumbnail": "http://localhost:5000//thumbnail/1da8c3eb-984b-4d04-8485-4093bef0ed78.jpg",
 *			"views": 715,
 *  			"position": "1"
 * 		},
 *		{
 * 			"id": 15,
 *			"url_thumbnail": "http://localhost:5000//thumbnail/3b456598-9d39-4696-8467-efe405ce4a90.jpg",
 *			"views": 487,
 *			"position": "2"
 *		},
 *		{
 *			"id": 14,
 *			"url_thumbnail": "http://localhost:5000//thumbnail/5bfd826b-dd97-4d29-9ee8-148730127e33.jpg",
 *			"views": 327,
 *			"position": "3"
 *		}
 *	]
 *}
 */
router.get('/channel/:userId', controllerHandler(videoController.getAllVideoByUserId)) //new

// ----- UPLOAD
/**
 * POST /upload/
 * @summary upload a video
 * @tags UPLOAD
 * @return {object} 200 - success response
 * @security BearerAuth
 */
router.post('/upload', security.check, controllerHandler(uploadController.uploadVideo)); //new


// ----- LIKE
/**
 * POST /like/add/{videoId}
 * @summary If the video is not liked, we like it and if the video is already liked, we dislike it
 * @tags LIKE
 * @param {integer} videoId.path.required - video_id param 
 * @return {object} 200 - success response
 * @security BearerAuth
 */
router.post('/like/add/:videoId', security.check, controllerHandler(likeController.addLike)); // news

// USER
router.get('/user/',security.check, controllerHandler(userController.getMyUser));
router.get('/user/search/:userName',security.check, controllerHandler(userController.get5UserByName));

router.post('/user/login', controllerHandler(userController.login)); //new
router.post('/user/register', controllerHandler(userController.addUser)); //new

// ----- COMMENT
router.get('/comment/:videoId', controllerHandler(commentController.getAllCommentByVideoId))
router.post('/comment/:videoId', security.check, controllerHandler(commentController.postCommentByVideoId))


router.patch('/user/',security.check, controllerHandler(userController.updateUser));
router.patch('/user/thumbnail/',security.check, controllerHandler(uploadController.uploadUserThumbnail));

router.delete('/user/:user_id', controllerHandler(userController.deleteUser));

// PASSWORD
router.patch('/user/password/',security.check, controllerHandler(userController.updatePassword))

module.exports = router;
