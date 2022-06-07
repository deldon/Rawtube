
const debug = require('debug')('dataMapper');
const dataBase = require('../dataBase');
const ApiError = require('../errors/apiError');

module.exports = {
  async getAllIncidents() {
    const query = 'SELECT * FROM incident;';
    const data = (await dataBase.query(query)).rows;
    debug(`> getAllIncidents(): ${query}`);
    if (!data) {
      throw new ApiError('No data found for getAllIncidents', 500);
    }
    return data;
  },
  
   async getIncidentById(id) {
    const query = {
      text: 'SELECT * FROM incident WHERE id = $1',
      values: [id],
    };
    const data = (await dataBase.query(query)).rows[0];
    debug(`> getIncidentsById(): ${query}`);
    if (!data) {
      throw new ApiError('No data found for getIncidentsById', 500);
    }
    return data;
  },
  
  }