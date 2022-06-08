const debug = require('debug')('userController');
const bcrypt = require('bcrypt');
const DataMapper = require('../dataMapper/userDataMapper');
// const jwt    = require('jsonwebtoken');
// const SECRET_KEY = process.env.SECRET_KEY;
// const url_avatar = process.env.URL_SERVER + 'avatar/';

module.exports = {

    addUser: async (req, res, next) => {

        if (req.body.new_password == req.body.confirm_new_password) {
            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.new_password, salt);
    
                const form = {
                    name: req.body.name,
                    email: req.body.email,
                    password: encryptedPassword,
                    description: req.body.description,
                    avatar: req.body.avatar
                }
     
            const newUser = await DataMapper.addUser(form);
            if (newUser) {
                debug(`> addUser()`);
                delete newUser.password;
                res.json(newUser);
            } else {
                next();
            }
        }

    }
}