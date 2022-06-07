const debug = require('debug')('ffmpegController');
const { spawn } = require('child_process');
const fs = require('fs');


const ffmpeg = {

    encoder: (videoSrcPath, videoId) => {
        debug('encoder called')

        const child = spawn('ffmpeg', ['-i', './public/videoTemp/' + videoSrcPath, '-b:v', '491k', '-b:a', '96k', '-r', '25', '-vf', 'scale=-1:720', './public/video/' + videoId + '.webm']);

        child.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        child.on('error', (error) => {
            console.error(`error: ${error.message}`);
        });

        child.on('close', (code) => {
            console.log(`child process videoEncode exited with code ${code}`);
            console.log('./public/videoTemp/' + videoSrcPath);

            fs.unlink('./public/videoTemp/' + videoSrcPath, (err => {
                if (err) console.log(err);
                else {
                    console.log("\nDeleted file: " + videoSrcPath);

                }
            }));

        });

    },
    thumbnail: (fileName,videoId) => {
        debug('thumbnail called')
        debug('./public/videoTemp/' + fileName)

        const child = spawn('ffmpeg', ['-i', './public/videoTemp/' + fileName, '-ss', '00:00:01.000', '-vframes', '1','./public/thumbnail/' + videoId + '.jpg']);

        child.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        child.on('error', (error) => {
            console.error(`error: ${error.message}`);
        });

        child.on('close', (code) => {
            debug(`child process videoTrumbnail exited with code ${code}`);
 

        });
    },
    videoDuration:(fileName)=>{
        const child = spawn('ffprobe', ['-i','./public/videoTemp/' + fileName,'-v','quiet', '-show_entries', 'format=duration', '-hide_banner', '-of', 'default=noprint_wrappers=1:nokey=1', '-sexagesimal']);
        let duration = 'dd'
        child.stdout.on('data', data => {
          debug('------------------------------------------',data.toString().split('.')[0]);
          duration = data.toString().split('.')[0];
        });
        
        child.stderr.on('data', data => {
          console.error(`stderr: ${data}`);
        }); 

        return duration
    }
}

module.exports = ffmpeg;