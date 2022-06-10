const debug = require('debug')('videoController');

module.exports = {
    getVideoById: (req,res)=>{ 
        res.render('pages/watch',{id:req.query.v})
    },

    getVideoByRelevance:  (req,res)=>{ 
        debug(req.session.user)
        res.render('pages/index', { data:req.session.user.name})
    }
}