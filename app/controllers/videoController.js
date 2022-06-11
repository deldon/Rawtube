const debug = require('debug')('videoController');
const videoDataMapper = require('../dataMapper/VideoDataMapper')

module.exports = {

    getVideoById: async (req, res) => {

        const data = await videoDataMapper.getVideoById(req.query.v);

        debug('getVideoById called');
        if (data) {
            await videoDataMapper.addViewsByid(req.query.v,data.views+1)
            res.render('pages/watch', { data, user:req.session.user })
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

            res.render('pages/index', { data, user:req.session.user });
        } else {
            next();
        }


    },

}