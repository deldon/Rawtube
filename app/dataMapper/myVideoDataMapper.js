const debug = require('debug')('videoDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {
    async addVideo(form) {

        // const query = `INSERT INTO rawtube_video (url_file,title,description,url_thumbnail,public,duration,user_id) VALUES 
        // ($1,$2,$3,$4,$5,$6,$7) RETURNING *;`;

        // const value = [form.url_file,form.title,form.description,form.url_thumbnail,Boolean(form.public),Number(form.duration),form.user_id];
        
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

}