const ApiError = require('../errors/apiError');
const debug = require('debug')('security');
const session = ('express-session');

module.exports = {
    isAuthenticated (req, res, next) {
    //     if (req.session.user) next()
    //     else next()
    //   }
        if (!req.session.user){
            
            throw new ApiError('No data found for > isAuthenticated()', 401);
             
        }
        else next();
    }
}