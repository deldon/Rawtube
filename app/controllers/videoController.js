const debug = require('debug')('videoController');
const userDataMapper = require('../dataMapper/userDataMapper');
const videoDataMapper = require('../dataMapper/VideoDataMapper')
const fs = require('fs');

module.exports = {

    getAllVideoByRelevance: async (req, res) => {
        debug('> getAllVideoByRelevance')


        const position = Number(req.params.position);
        if (position > 0 && Number.isInteger(position)) {

            const data = await videoDataMapper.getAllVideoByRelevance(position);

            data.url_file = process.env.URL_SERVER + 'video?v=' + data.url_file
            data.user_url_thumbnail = process.env.URL_SERVER + 'userThumbnail/' + data.user_url_thumbnail

            data.user_is_liked = false

            if (req.decoded) { // IF TOKEN
                debug('TOKEN for user ',req.decoded.user.id)
                const userIsLiked = await videoDataMapper.videoIsLiked(Number(req.decoded.user.id), data.video_id)
                debug(userIsLiked)
                data.user_is_liked = userIsLiked
            }


            if (data) {

                await videoDataMapper.incrementViews(data.video_id)


                res.json(data)
            } else {
                debug('the position and greater than the number of videos')

                res.status(404).json({ error: 'the position and greater than the number of videos' })
            }

        } else {
            debug('the parameter must be a positive integer')
            res.status(404).json({ error: 'the parameter must be a positive integer' })
        }

    },

    getAllVideoByUserById: async (req, res) => {
        debug('> getAllVideoByUserById')

        const position = Number(req.params.position);
        const userId = Number(req.params.userId)

        const userIsExiste = await userDataMapper.userIsExist(userId)

        if (userIsExiste) {


            if (position > 0 && Number.isInteger(position)) {

                const data = await videoDataMapper.getAllVideoByUserById(position, userId)
                data.url_file = process.env.URL_SERVER + 'video/?v=' + data.url_file
                data.user_url_thumbnail = process.env.URL_SERVER + 'userThumbnail/' + data.user_url_thumbnail

                data.user_is_liked = false

                if (req.decoded) { // IF TOKEN
                    debug('TOKEN for user ',req.decoded.user.id)
                    const userIsLiked = await videoDataMapper.videoIsLiked(Number(req.decoded.user.id), data.video_id)
                    debug(userIsLiked)
                    data.user_is_liked = userIsLiked
                }

                
                if (data) {
                    await videoDataMapper.incrementViews(data.video_id)
                    res.json(data)
                } else {
                    debug('the position and greater than the number of videos')

                    res.status(404).json({ error: 'the position is greater than the number of videos or the user does not exist' })
                }

            } else {
                debug('the parameter must be a positive integer')
                res.status(404).json({ error: 'the parameter must be a positive integer' })
            }

        } else {
            debug('The user does not exist')
            res.status(404).json({ error: 'The user does not exist' })
        }

    },

    getAllVideoByUserId: async (req, res) => {
        debug('> getAllVideoByUserId')
        const userId = Number(req.params.userId)

        const user = await userDataMapper.getUserInfoById(userId);
        user.url_thumbnail = process.env.URL_SERVER + 'userThumbnail/' + user.url_thumbnail
        const videos = await videoDataMapper.getAllVideoByUserId(userId);

        videos.map((e) => {

            e.url_thumbnail = process.env.URL_SERVER + '/thumbnail/' + e.url_thumbnail
        })



        res.json({ user, videos })

    },


    deleteVideoById: async (req, res, next) => {

        const videoId = req.params.videoId;
        const user_id = req.decoded.user.id

        const videoDelete = await videoDataMapper.deleteVideoById(videoId, user_id);

        debug('deleteVideo called');
        if (videoDelete) {

            debug(`> deleteVideo()`);

            fs.unlink('./public/thumbnail/' + videoDelete.url_thumbnail, (err => {
                if (err) debug(err);
                else {
                    debug("\nDeleted thumbnail: " + videoDelete.url_thumbnail);

                }
            }));

            fs.unlink('./public/video/' + videoDelete.url_file, (err => {
                if (err) debug(err);
                else {
                    debug("\nDeleted video: " + videoDelete.url_file);

                }
            }));


            res.json(videoDelete)
        } else {
            res.status(400)
        }

    },




}