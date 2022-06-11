const debug = require('debug')('myVideoController');
const dayjs = require('dayjs');
const fs = require('fs');
const myVideoDataMapper = require('../dataMapper/myVideoDataMapper');

module.exports = {

    getAllMyVideo: async (req, res) => {

        const user_id = req.session.user.id;
        const data = await myVideoDataMapper.getAllMyVideo(user_id);

        debug('getVideoById called');
        if (data) {

            data.map((x) => {
                x.release_date = dayjs(x.release_date).format('DD/MM/YYYY HH:mm');
                if (x.public === true) {
                    x.public = 'Publique';
                } else {
                    x.public = 'Non répertoriée';
                }

            })

            res.render('pages/myvideo', { data, user: req.session.user });
        } else {
            next();
        }

    },
    getForUptadeMyVideo: async (req, res) => {

        const video_id = req.params.id;
        const user_id = req.session.user.id;
        const data = await myVideoDataMapper.getForUptadeMyVideo(video_id, user_id);

        debug('getForUptadeMyVideo called');
        if (data) {
            res.render('pages/updateVideo', { data, user: req.session.user });
        } else {
            next();
        }

    },

    UptadeMyVideo: async (req, res, next) => {

        const data = await myVideoDataMapper.uptadeMyVideo(req.body, req.params.id);

        debug('UptadeMyVideo called');
        if (data) {
            res.redirect('/myvideo/');
        } else {
            next();
        }

    },
    deleteVideo: async (req, res, next) => {

        const videoId = req.params.id;
        const user_id = req.session.user.id;

        const videoDelete = await myVideoDataMapper.deleteVideo(videoId, user_id);

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


            res.redirect('/myvideo');
        } else {
            next();
        }

    },
}