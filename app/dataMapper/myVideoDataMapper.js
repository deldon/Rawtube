const debug = require('debug')('videoDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {
    async addVideo(form) {

        const query = `SELECT * FROM add_video($1);`;
        const value = [form];
       
        debug(value)
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> addUser()`);
        if (!data) {
          throw new ApiError('No data found for > addUser()', 400);
        }
        
        return data;
      },
      
      async getAllMyVideo(user_id) {
        debug('getAllMyVideo');

        const query = `SELECT 
        rawtube_video.id,
        rawtube_video.url_thumbnail,
        rawtube_video.duration,
        rawtube_video.title,
        rawtube_video.public,
        rawtube_video.release_date,
        rawtube_video.views,
        (SELECT COUNT(*) 
            FROM rawtube_commentaries
            WHERE rawtube_commentaries.video_id = rawtube_video.id) AS commentaries
        FROM rawtube_video
        WHERE rawtube_video.user_id = $1`;

        const values = [user_id]

        const data = (await dataBase.query(query,values)).rows;
        debug(`> getAllMyVideo()`);
        if (!data) {
          throw new ApiError('No data found for > getAllMyVideo()', 400);
        }
        
        return data;
      },

      async uptadeMyVideo(video_id,user_id) {
        debug('uptadeMyVideo');

        const query = `SELECT 
        rawtube_video.id,
        rawtube_video.title,
        rawtube_video.url_thumbnail,
        rawtube_video.description,
        rawtube_video.public
        FROM rawtube_video
        WHERE rawtube_video.id = $1
        AND rawtube_video.user_id = $2`;

        const values = [video_id,user_id]

        const data = (await dataBase.query(query,values)).rows[0];
        debug(`> uptadeMyVideo()`);
        if (!data) {
          throw new ApiError('No data found for > uptadeMyVideo()', 400);
        }
        
        return data;
      },
}