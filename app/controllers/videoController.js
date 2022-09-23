const debug = require('debug')('videoController');
const favVideoDataMapper = require('../dataMapper/favVideoDataMapper');
const userDataMapper = require('../dataMapper/userDataMapper');
const videoDataMapper = require('../dataMapper/VideoDataMapper')

module.exports = {

    getAllVideoByRelevance: async (req, res) => {
        debug('> getAllVideoByRelevance')

        const position = Number(req.params.position);
        if (position > 0 && Number.isInteger(position)) {

            const data = await videoDataMapper.getAllVideoByRelevance(position);

            if (data) {
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

    deleteVideoById: async (req,res) => {
        debug('> deleteVideoById')

        const user = 1;
        //--------------------------------------------------- check if the video is deleted by its owner

        const videoId = Number(req.params.videoId)
        debug(req.params.videoId)
        const response = await videoDataMapper.deleteVideoById(videoId);

                res.json(response)
    }




}