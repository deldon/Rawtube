const debug = require('debug')('ffmpegController');
const { spawn } = require('child_process');
const spawn2 = require('await-spawn')
const fs = require('fs');


const ffmpeg = {

    encoder: async (videoSrcPath, videoId) => {

        try {
            debug('encoder called')
            const bl = await spawn2('ffmpeg', ['-i', './public/videoTemp/' + videoSrcPath, '-b:v', '491k', '-b:a', '96k', '-r', '25', '-vf', 'scale=-1:720', './public/video/' + videoId + '.webm']);
            console.log(bl.toString());
        } catch (e) {
            console.log(e.stderr.toString())
        }

    },
    
    thumbnail: async (fileName, videoId) => {

        try {
            debug('thumbnail called')
            const bl = await spawn2('ffmpeg', ['-i', './public/videoTemp/' + fileName, '-ss', '00:00:01.000', '-vframes', '1', './public/thumbnail/' + videoId + '.jpg']);
            console.log(bl.toString());
        } catch (e) {
            console.log(e.stderr.toString())
        }
    },

    videoDuration: async (fileName) => {

        try {
            debug('Duration called')
            const bl = await spawn2('ffprobe', ['-i', './public/videoTemp/' + fileName, '-v', 'quiet', '-show_entries', 'format=duration', '-hide_banner', '-of', 'default=noprint_wrappers=1:nokey=1', '-sexagesimal']);
            return bl.toString().split('.')[0];
        } catch (e) {
            console.log(e.stderr.toString())
        }
    },

    videoDelete: async (videoSrcPath) => {

        fs.unlink('./public/videoTemp/' + videoSrcPath, (err => {
            if (err) console.log(err);
            else {
                debug("\nDeleted file: " + videoSrcPath);

            }
        }));
    }

}

module.exports = ffmpeg;