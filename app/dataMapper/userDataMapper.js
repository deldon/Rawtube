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

      async updateUser(form,user_id) {

        const query = `SELECT * FROM update_user($1,$2);`;
        const value = [form, user_id];
        console.log(value)
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> updateUser()`);
        if (!data) {
          throw new ApiError('No data found for > updateUser()', 400);
        }
        
        return data;
      },

      async deleteUser(user_id) {

        const query = `
        DELETE FROM rawtube_user 
        WHERE id = $1 
        RETURNING id`;

        const value = [user_id];
        const data = (await dataBase.query(query, value)).rows[0];
        debug(`> deleteUser()`);
        if (!data) {
          throw new ApiError('No data found for > deleteUser()', 400);
        }
        
        return data;
      }

}