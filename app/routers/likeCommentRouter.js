const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const security = require('../middleware/security');
const likeController = require('../controllers/likeController');
const commentController = require('../controllers/commentController');


// ----- LIKE
/**
 * POST /like/add/{videoId}
 * @summary If the video is not liked, we like it and if the video is already liked, we dislike it
 * @tags LIKE
 * @param {integer} videoId.path.required - video_id param 
 * @return {object} 200 - success response
 * @security BearerAuth
 * @example response - 200 - example success response
 * {
 * 	"liked": true,
 * 	"newLikeNumber": "3"
 * }
 */
router.post('/like/add/:videoId', security.check, controllerHandler(likeController.addLike)); // news

// ----- COMMENT
/**
 * get /comment/{videoId}
 * @summary See all the comments of a video
 * @tags COMMENT
 * @param {integer} videoId.path.required - video_id param 
 * @return {object} 200 - success response
 * @example response - 200 - example success response
 * {
 *	"comment_number": 1,
 *	"comments": [
 *		{
 *			"user_id": 16,
 *			"user_name": "Jeanjean",
 *			"user_thumbnail": "http://localhost:5000//userThumbnail/user.jpg",
 *			"comment_id": 48,
 *			"comment_text": "coucou",
 *			"comment_created_at": "2022-10-04T12:51:39.812Z"
 *		},
  *		{
 *			"user_id": 12,
 *			"user_name": "Lia",
 *			"user_thumbnail": "http://localhost:5000//userThumbnail/lia.jpg",
 *			"comment_id": 48,
 *			"comment_text": "coucou",
 *			"comment_created_at": "2022-10-04T12:51:39.812Z"
 *		}
 *	]
 * }
 */
router.get('/comment/:videoId', controllerHandler(commentController.getAllCommentByVideoId))


/**
 * Comment
 * @typedef {object} Comment
 * @property {string} comment_text.required - Comment text
 */
/**
 * post /comment/{videoId}
 * @summary Send a comment
 * @tags COMMENT
 * @param {integer} videoId.path.required - video_id param 
 * @param {Comment} request.body.required - Comment text
 * @example request - example payload
 * @return {object} 200 - success response
 * @security BearerAuth
 * @example response - 200 - example success response
 * {
 *	"user_id": 16,
 *	"user_name": "Jeanjean",
 *	"user_thumbnail": "http://localhost:5000//userThumbnail/user.jpg",
 *	"comment_id": 49,
 *	"comment_text": "Lorem ipsum",
 *	"comment_created_at": "2022-10-05T10:46:22.933Z"
 * }
 */
router.post('/comment/:videoId', security.check, controllerHandler(commentController.postCommentByVideoId))



module.exports = router;
