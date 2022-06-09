const debug = require('debug')('myVideoController');
const myVideoDataMapper = require ('../dataMapper/myVideoDataMapper')

module.exports = {

    addVideo: async (req,res)=>{

        const form = {
            title: req.body.title,
            description: req.body.description,
            public: Boolean(req.body.public),
            url_file: req.body.url_file,
            url_thumbnail: req.body.url_thumbnail,
            duration: Number(req.body.duration),
            user_id:1
        }
        debug(form)
        const newUser = await myVideoDataMapper.addVideo(form);
        if (newUser) {
            debug(`> addVideo()`);
            
            res.redirect('/')
        } else {
            next();
        }
    
        
    }
}