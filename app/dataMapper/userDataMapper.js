const debug = require('debug')('userDataMapper');
const dataBase = require('../config/db');
const ApiError = require('../errors/apiError');

module.exports = {

    async addUser(form) {

        const query = `SELECT * FROM add_user($1);`;
        const value = [form];
    
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> addUser()`);
        if (!data) {
          throw new ApiError('No data found for > addUser()', 400);
        }
        
        return data;
      },

}