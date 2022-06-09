const debug = require('debug')('videoController');
const videoDataMapper = require('../dataMapper/VideoDataMapper')

module.exports = {
    getVideoById: async (req, res) => {
        const data = await videoDataMapper.getVideoById(req.query.v);
        debug('getVideoById called');
        if (data) {

            res.render('pages/watch', { data })
        } else {
            next();
        }

    },

    getVideoByRelevance: async (req, res) => {


        const data = await videoDataMapper.getVideoByReleaseDate();
        debug('getVideoByRelevance called');
        if (data) {

            data.map((x)=>{

                const date = new Date(0);
                date.setSeconds(x.duration); // specify value for SECONDS here
                x.duration = date.toISOString().substr(11, 8);
            })


            res.render('pages/index', { data })
        } else {
            next();
        }


    },

}