const debug = require('debug')('myVideoController');

module.exports = {

    addVideo: (req,res)=>{
        console.log(req.body);

        // datamapper
        res.redirect('/')
    }
}