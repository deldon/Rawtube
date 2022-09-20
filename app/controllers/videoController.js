const debug = require('debug')('videoController');
const favVideoDataMapper = require('../dataMapper/favVideoDataMapper');
const videoDataMapper = require('../dataMapper/VideoDataMapper')

module.exports = {

    getVideoById: async (req, res) => {

        const data = await videoDataMapper.getVideoById(req.query.v);



        debug('getVideoById called');
        if (data) {
            await videoDataMapper.addViewsByid(req.query.v, data.views + 1)

            if (req.session.user) {

                const favExiste = await favVideoDataMapper.isExisteFavVideo(req.session.user.id, req.query.v)

                res.json( { video:data, isFav:favExiste })
            } else {
                res.json( { video:data, isFav:false })
            }

            
        } else {
            next();
        }

    },

    getVideoByRelevance: async (req, res) => {

        const data = await videoDataMapper.getVideoByReleaseDate();

        debug('getVideoByRelevance called');
        if (data) {

            data.map((x) => {
                const date = new Date(0);
                date.setSeconds(x.duration); // specify value for SECONDS here
                x.duration = date.toISOString().substr(11, 8);
            })

            res.json(data);
        } else {
            next();
        }


    },

}