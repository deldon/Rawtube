const debug = require('debug')('videoDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {

  async addViewsByid(id,newValue) {

    const query = `UPDATE rawtube_video
    SET views = $2
    WHERE id = $1`;
    const values = [id,newValue]

    const data = (await dataBase.query(query,values)).rows[0];
    
    debug(`> addViewsByid()`);

    return data;
  },


  async getVideoById(id) {
    debug(id)
    const query = `SELECT 
    rawtube_video.id,
    rawtube_video.title,
    rawtube_video.url_file,
    rawtube_video.duration,
    rawtube_video.description,
    rawtube_video.views,
    rawtube_user.id AS user_id,
    rawtube_user.name AS user_name,
    rawtube_user.avatar AS user_avatar
    FROM rawtube_video
    JOIN rawtube_user ON rawtube_user.id = rawtube_video.user_id
    WHERE rawtube_video.id = $1;`;

    const values = [id]

    const data = (await dataBase.query(query,values)).rows[0];
    debug(`> getVideoById()`);
    if (!data) {
      throw new ApiError('No data found for > getVideoById()', 400);
    }
    
    return data;
  },
    async getVideoByReleaseDate() {

        const query = `SELECT 
        rawtube_video.id,
        rawtube_video.title,
        rawtube_video.url_thumbnail,
        rawtube_video.duration,
        rawtube_video.views,
        rawtube_user.id AS user_id,
        rawtube_user.name AS user_name,
        rawtube_user.avatar AS user_avatar
        FROM rawtube_video
        JOIN rawtube_user ON rawtube_user.id = rawtube_video.user_id
        WHERE rawtube_video.public = true
        ORDER BY rawtube_video.release_date;`;

        const data = (await dataBase.query(query)).rows;
        debug(`> getVideoByReleaseDate()`);
        if (!data) {
          throw new ApiError('No data found for > addUser()', 400);
        }
        
        return data;
      },

}