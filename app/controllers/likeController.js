const debug = require('debug')('likeController');
const bcrypt = require('bcrypt');
const likeDataMapper = require('../dataMapper/likeDataMapper')
const videoDataMapper = require('../dataMapper/VideoDataMapper')
// const url_avatar = process.env.URL_SERVER + 'avatar/';

module.exports = {
    
    addLike: async (req, res, next) => {

        const userId = req.decoded.user.id;
        const videoId = req.params.videoId

        const likeIsExist = await videoDataMapper.videoIsLiked(userId,videoId)

        if (likeIsExist) {
            const isDelete = await likeDataMapper.deleteLike(userId,videoId)
            if (isDelete) {

                const count = await likeDataMapper.countLike(videoId)
                res.json({
                    "liked": false,
                    "newLikeNumber": count.count
                })
            }
        }else{
            const newLike = await likeDataMapper.addLike(userId,videoId);

            const count = await likeDataMapper.countLike(videoId)
                res.json({
                    "liked": true,
                    "newLikeNumber": count.count
                })

        }
        


       

    },

    

}