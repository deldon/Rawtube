const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const uploadController = require('../controllers/uploadController');
const streamController = require('../controllers/streamController');
const videoController = require('../controllers/videoController');

const security = require('../middleware/security');


/**
 * GET /video/{position}
 * @summary Give a video by relevance with a presise position
 * @tags VIDEO
 * @param {integer} position.path.required - position param 
 * @return {object} 200 - success response
 * @example response - 200 - example success response
 * {
 * 	"video_id": 19,
 * 	"user_id": 2,
 * 	"user_name": "mark",
 * 	"user_url_thumbnail": "http://localhost:5000/userThumbnail/phil.jpg",
 * 	"likes": "1",
 * 	"number_of_comments": "1",
 * 	"user_is_liked": false
 * }
 */
router.get('/video/:position/', security.pass, controllerHandler(videoController.getAllVideoByRelevance));

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
 * 	"user_id": 2,
 * 	"user_name": "mark",
 * 	"user_url_thumbnail": "http://localhost:5000/userThumbnail/phil.jpg",
 * 	"likes": "1",
 * 	"number_of_comments": "1",
 * 	"user_is_liked": false
 * }
 */
router.get('/video/:position/:userId', security.pass, controllerHandler(videoController.getAllVideoByUserById));

/**
 * DELETE /video/{videoId}
 * @summary Delete video by id
 * @tags VIDEO
 * @param {integer} videoId.path.required - Video id
 * @return {object} 200 - success response
 * @security BearerAuth
 */
router.delete('/video/:videoId', security.check, controllerHandler(videoController.deleteVideoById));

// ----- CHANNEL ----- //

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
 *  		"position": "1"
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
router.get('/channel/:userId', controllerHandler(videoController.getAllVideoByUserId));

// ----- STREAM -----//
/**
 * GET /stream/
 * @summary retrieve the video stream
 * @tags VIDEO
 * @param {string} videoId.path.required - Video id
 * @return {object} 200 - success response
 */
 router.get('/stream/:videoId', controllerHandler(streamController.stream));

// ----- UPLOAD ----- //
/**
 * A Video
 * @typedef {object} Video
 * @property {string} sampleFile - Video file - binary
 */
/**
 * POST /upload/
 * @summary upload a video
 * @tags VIDEO
 * @param {Video} request.body.required - Video file - multipart/form-data
 * @return {object} 200 - success response
 * @security BearerAuth
 * @example response - 200 - example success response
 * {
 *	"id": 26,
 *	"is_encoded": false,
 *	"url_thumbnail": "http://localhost:5000/thumbnail/0a119c27-3ae1-450b-be88-c8ca858a28ea.jpg",
 *	"duration": 14,
 *	"user_id": 16,
 *	"created_at": "2022-10-05T15:08:30.970Z"
 * }
 */
router.post('/upload', security.check, controllerHandler(uploadController.uploadVideo));


module.exports = router;
