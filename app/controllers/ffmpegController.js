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
            await ffmpeg.videoDelete();
        } catch (e) {
            console.log(e.stderr.toString())
        }

    },

    thumbnail: async (fileName, videoId, duration) => {


        try {
            const divi = Math.floor(duration / 3)

            var date = new Date(0);
            date.setSeconds(divi); // specify value for SECONDS here
            var timeString = date.toISOString().substr(11, 8) + '.000';

            debug('thumbnail called at :' + timeString)
            const bl = await spawn2('ffmpeg', ['-i', './public/videoTemp/' + fileName, '-ss', timeString , '-vframes', '1', './public/thumbnail/' + videoId + '.jpg']);
            console.log(bl.toString());
        } catch (e) {
            console.log(e.stderr.toString())
        }
    },

    videoDuration: async (fileName) => {

        try {
            debug('Duration called')
            const bl = await spawn2('ffprobe', ['-i', './public/videoTemp/' + fileName, '-v', 'quiet', '-show_entries', 'format=duration', '-hide_banner', '-of', 'default=noprint_wrappers=1:nokey=1', '-sexagesimal']);

            const duration = bl.toString().split('.')[0];

            const temp = {
                hours: Number(duration.split(':')[0]),
                minutes: Number(duration.split(':')[1]),
                seconds: Number(duration.split(':')[2]),
            }

            temp.total = (temp.hours * 3600) + (temp.minutes * 60) + temp.seconds


            return temp.total;
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