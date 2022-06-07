const debug = require('debug')('incidentsController');
const dataMapper = require('../dataMapper/dataMapper');

module.exports = {

  getAllIncidents: async (_req, res, next) => {
    const incidents = await dataMapper.getAllIncidents();
    debug('getAllIncidents called');
    if (incidents) {
      res.render('home', { incidents });
    } else {
      next();
    }
  },

    helloWord: async (_req, res, next) => {
    debug('helloWord called');
    res.json({msg: 'Hello word'});
  },
  
  }
