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

// -------- LOGIN -------- //
/**
 * POST /login/
 * @summary This is the summary of the endpoint
 * @tags LOGIN
 * @return {object} 200 - success response
 */

router.get('/opop/',security.pass,(req,res)=>{
    res.json(req.decoded)
})


// VIDEO
router.get('/video/:position/',security.pass, controllerHandler(videoController.getAllVideoByRelevance)); //new
router.get('/video/:position/:userId',security.pass, controllerHandler(videoController.getAllVideoByUserById)); //new

router.delete('/video/:videoId',security.check, controllerHandler(videoController.deleteVideoById)) //new

// CHANNEL
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
