const debug = require('debug')('streamController');
const fs = require('fs');

module.exports = {

    stream: (req,res) => {

        const range = req.headers.range;

        if (!range) {
            res.status(400).send("Requires Range header");
        }
    
        const videoPath = "./public/video/" + req.query.v;
        const videoSize = fs.statSync(videoPath).size;

        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        debug('stream called | ', req.query.v + ' | ' + start);

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



