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

    getAllVideoByUserId: async(req,res) => {
        debug('> getAllVideoByUserId')
        const userId = Number(req.params.userId)

        const user = await userDataMapper.getUserInfoById(userId);
        const videos = await videoDataMapper.getAllVideoByUserId(userId);

        res.json({user,videos})

    },


    deleteVideoById: async (req, res, next) => {

        const videoId = req.params.videoId;
        const user_id = 1

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
            next();
        }

    },




}