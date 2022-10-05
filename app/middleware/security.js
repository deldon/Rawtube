const ApiError = require('../errors/apiError');
const debug = require('debug')('security');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {

    check: (req, res, next) => {


        debug(req.headers['authorization'])
        // Token un let token then we slice the token bearer
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (!!token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        // Decoding and verification of the token with the secret key
        if (token) {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    debug('token_not_valid');
                    return res.status(401).json('token_not_valid');
                } else {
                    req.decoded = decoded;

                    next();



                }
            });
        } else {
            return res.status(401).json('token_required');
        }

    },

    pass: (req, res, next) => {
        debug('> pass')

        // Token un let token then we slice the token bearer
        let token = req.headers['x-access-token'] || req.headers['authorization'];
        if (!!token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        // Decoding and verification of the token with the secret key
        if (token) {
            jwt.verify(token, SECRET_KEY, (err, decoded) => {
                if (err) {
                    next();
                    req.decoded = null
                } else {
                    debug(decoded)
                    req.decoded = decoded;

                    next();



                }
            });
        } else {
           next();
        }

    }



}











////
