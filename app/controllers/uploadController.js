const debug = require('debug')('uploadController');

const ffmpeg = require('./ffmpegController');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    uploadTemplate: (req,res,next) => {
        res.render('pages/upload')
    },

    uploadVideo: async (req, res, next) => {
        debug('videoUpload')
        let sampleFile;
        let uploadPath;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json('No files were uploaded.');
        }

        sampleFile = req.files.sampleFile;
        uploadPath = './public/videoTemp/' + sampleFile.name;

        sampleFile.mv(uploadPath, async (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            const videoId = uuidv4();

            const duration = await ffmpeg.videoDuration(sampleFile.name)
            await ffmpeg.thumbnail(sampleFile.name, videoId,duration)
            ffmpeg.encoder(sampleFile.name, videoId)
            res.render('pages/post_video',{
                video_id:videoId,
                video_thumbnail: videoId + '.jpg',
                video_url: videoId + '.webm',
                watch: '/watch?v=' + videoId,
                duration: duration

            });
        });
    }

}