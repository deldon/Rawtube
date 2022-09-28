const debug = require('debug')('commentController');
const commentDataMapper = require('../dataMapper/commentDataMapper')
const fs = require('fs');

module.exports = {

    getAllCommentByVideoId: async (req, res) => {
        debug('> getAllCommentByVideoId')

        const videoId = Number(req.params.videoId)

        const comments = await commentDataMapper.getAllCommentByVideoId(videoId);

        comments.map((e) => {

            e.user_thumbnail = process.env.URL_SERVER + '/userThumbnail/' + e.user_thumbnail
        })

        const comment_number = comments.length

        res.json({ comment_number, comments })

    },


    postCommentByVideoId: async (req, res) => {
        debug('> postCommentByVideoId')

        const videoId = Number(req.params.videoId)
        const userId = req.decoded.user.id
        const comment = req.body.comment_text

        const postComment = await commentDataMapper.postCommentByVideoId(userId, videoId, comment)
        const newComment = await commentDataMapper.getCommentById(postComment.id)
        newComment.user_thumbnail = process.env.URL_SERVER + '/userThumbnail/' + newComment.user_thumbnail


        res.json(newComment)

    },







}