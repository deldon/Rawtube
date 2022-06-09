const debug = require('debug')('videoController');

module.exports = {
    getVideoById: (req,res)=>{ 
        res.render('pages/watch',{id:req.query.v})
    },

    getVideoByRelevance:  (req,res)=>{ 
        res.render('pages/index')
    },

}