const debug = require('debug')('favVideoController');
const favVideoDataMapper = require('../dataMapper/favVideoDataMapper')

module.exports = {

    getAllFavVideoByUser: async (req, res, next) => {

        const user_id = req.session.user.id;

        const data = await favVideoDataMapper.getAllFavVideoByUser(user_id);

        debug(`> getAllFavVideoByUser()`);
        if (data) {

            res.render('pages/myfavorite',{data, user: req.session.user.id})
        } else {
            next();
        }
    

},

    addFavVideo: async (req, res, next) => {

            const user_id = req.session.user.id;
            const video_id = req.params.id
            const data = await favVideoDataMapper.addFavVideo(user_id,video_id)

            debug(`> addFavVideo()`);
            if (data) {

                res.redirect('/watch?v=' + video_id)
            } else {
                next();
            }
        

    },

    deleteFavVideo: async (req, res, next) => {

        const user_id = req.session.user.id;
        const video_id = req.params.id
        const data = await favVideoDataMapper.deleteFavVideo(user_id,video_id)

        debug(`> deleteFavVideo()`);
        if (data) {

            res.redirect('/myfavorite')
        } else {
            next();
        }

        
    

    },


}