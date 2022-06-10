const debug = require('debug')('myVideoController');
const dayjs = require('dayjs')
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
    
        
    },

    getAllMyVideo: async (req, res) => {
        debug('getAllMyVideo')
        const user_id = 1;
        const data = await myVideoDataMapper.getAllMyVideo(user_id)
        debug('getVideoById called');
        if (data) {
            data.map((x)=>{          
                x.release_date = dayjs(x.release_date).format('DD/MM/YYYY HH:mm');
                if (x.public === true) {
                    x.public = 'Publique'
                }else{
                    x.public = 'Non répertoriée'
                }

              })

            res.render('pages/myvideo', { data })
        } else {
            next();
        }

    },
}