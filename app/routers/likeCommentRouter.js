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
 */
router.post('/like/add/:videoId', security.check, controllerHandler(likeController.addLike)); // news

// ----- COMMENT
router.get('/comment/:videoId', controllerHandler(commentController.getAllCommentByVideoId))
router.post('/comment/:videoId', security.check, controllerHandler(commentController.postCommentByVideoId))



module.exports = router;
