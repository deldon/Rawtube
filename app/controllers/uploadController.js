const debug = require('debug')('uploadController');

const ffmpeg = require('./ffmpegController');
const { v4: uuidv4 } = require('uuid');

module.exports = {

    uploadVideo: async (req, res, next) => {
        debug('videoUpload')
        let sampleFile;
        let uploadPath;

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.sampleFile;
        uploadPath = './public/videoTemp/' + sampleFile.name;
        //debug(uploadPath)

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, async (err) => {
            if (err) {
                return res.status(500).json(err);
            }

            const videoId = uuidv4();

            await ffmpeg.encoder(sampleFile.name, videoId)
            await ffmpeg.thumbnail(sampleFile.name, videoId)
            const duration = await ffmpeg.videoDuration(sampleFile.name)
            ffmpeg.videoDelete(sampleFile.name)
            res.json({
                video_id:videoId,
                video_thumbnail: '/thumbnail/' + videoId + '.jpg',
                video_url: '/video/' + videoId + '.webm',
                duration: duration

            });
        });
    }

}