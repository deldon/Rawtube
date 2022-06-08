const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const uploadController = require('../controllers/uploadController');
const streamController = require('../controllers/streamController');


// TEST

router.get('/watch',(req,res)=>{ 
    res.render('pages/watch',{id:req.query.v})
})


// UPLOAD
router.get('/upload', controllerHandler(uploadController.uploadTemplate))
router.post('/upload', controllerHandler(uploadController.uploadVideo))

//STREAM
router.get('/video', controllerHandler(streamController.stream))

module.exports = router;
