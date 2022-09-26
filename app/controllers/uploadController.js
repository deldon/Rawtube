const debug = require('debug')('uploadController');
const myVideoDataMapper = require ('../dataMapper/myVideoDataMapper');
const ffmpeg = require('./ffmpegController');
const { v4: uuidv4 } = require('uuid');
const VideoDataMapper = require('../dataMapper/VideoDataMapper');

module.exports = {

    uploadVideo: async (req, res, next) => {
        debug('VideoUpload Satart');
        let sampleFile;
        let uploadPath;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json('No files were uploaded.');
        }

        sampleFile = req.files.sampleFile;
        uploadPath = './public/videoTemp/' + sampleFile.name;

        sampleFile.mv(uploadPath, async (err) => {

            debug('video uploded')
            if (err) {
                return res.status(500).json(err);
            }

            const videoId = uuidv4();

            const duration = await ffmpeg.videoDuration(sampleFile.name);

            await ffmpeg.thumbnail(sampleFile.name, videoId,duration);
            ffmpeg.encoder(sampleFile.name, videoId);

            const form = {
                url_file: videoId + '.webm',
                is_encoded:false,
                url_thumbnail: videoId + '.jpg',
                duration: duration,
                user_id:2
            }
            
            const newVideo = await VideoDataMapper.addVideo(form)

            
    
            
            if (newVideo) {
                debug(`> addVideo()`);
                
                res.json(newVideo)
            } else {
                next();
            }

        });
    }

}