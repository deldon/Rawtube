const debug = require('debug')('streamController');
const videoDataMapper = require('../dataMapper/VideoDataMapper')
const fs = require('fs');

module.exports = {

    stream:async (req,res) => {

        const videoId = req.params.videoId

        const data = (await videoDataMapper.getUrlFileByVideoId(videoId))

        
        const range = req.headers.range;

        if (!range) {
            res.status(400).send("Requires Range header");
        }
    
        const videoPath = "./public/video/" + data.url_file;
        const videoSize = fs.statSync(videoPath).size;

        const CHUNK_SIZE = 10 ** 6; // 1MB 
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        debug('stream called | ', data.url_file + ' | ' + start);

        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/webm",
        };
    
        res.writeHead(206, headers);
    
        const videoStream = fs.createReadStream(videoPath, { start, end });
    
        videoStream.pipe(res);
    
    }
}



