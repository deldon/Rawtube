const debug = require('debug')('userController');
const bcrypt = require('bcrypt');
const DataMapper = require('../dataMapper/userDataMapper');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
// const url_avatar = process.env.URL_SERVER + 'avatar/';

module.exports = {

    addUser: async (req, res, next) => {

        debug(req.body)
        if (req.body.password == req.body.confirm_password) {

            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(req.body.password, salt);

            const form = {
                name: req.body.user_name,
                email: req.body.email,
                password: encryptedPassword,
                url_thumbnail: 'user.jpg'
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

    },

    getMyUser: async (req, res, next) => {
        let userId = req.decoded.user.id;

        const user = await DataMapper.getMyUserById(userId);

        if (user) {
            debug(`> getMyUser()`);
            res.json(user);
        } else {
            next();
        }
    },

    get5UserByName: async (req, res, next) => {
        let userName = req.params.userName;
        const users = await DataMapper.getUsersByName(userName);
        debug(users)
        if (users) {
            debug(`> get5UserByName()`);
            res.json(users);
        } else {
            next();
        }
    },

    deleteUser: async (req, res, next) => {
        const userId = req.params.user_id
        const user = await DataMapper.deleteUser(userId)
        console.log(req.params)
        if (user) {
            debug(`> deleteUser()`);
            res.json({
                message: `user :${userId} is removed`,
                id: Number(userId)
            });
        } else {
            next();
        }

    },

    updateUser: async (req, res, next) => {
        let userId = req.decoded.user.id

        form = {
            name: req.body.user_name,
            email: req.body.email
        }
        console.log(form)
        const user = await DataMapper.updateUser(form, userId);
        console.log(user)
        if (user) {
            debug(`> updateUser()`);
            delete user.password;
            res.json(user);
        } else {
            next();
        }
    },

    updatePassword: async (req, res, next) => {

        let userId = req.decoded.user.id;

        const oldPassword = await DataMapper.getPasswordById(userId);
        const validPwd = await bcrypt.compare(req.body.old_password, oldPassword.password);
        if (!validPwd) {
            return res.json({
                error: "Ce n'est pas le bon mot de passe."
            });
        }
        if (req.body.new_password != req.body.repeat_password) {
            return res.json({
                error: "Les 2 mots de passe ne sont pas identiques"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(req.body.new_password, salt);

        const data = await DataMapper.updatePassword(encryptedPassword, userId);
        if (data) {
            debug(`> updatePassword()`);
            res.json({
                "password_changed":true
            });
        } else {
            next();
        }
    },


    login: async (req, res, next) => {

        const user = await DataMapper.getUserByEmail(req.body.email)


        if (user) {

            const validPwd = await bcrypt.compare(req.body.password, user.password);

            if (!validPwd) {
                return res.json({
                    error: "Ce n'est pas le bon mot de passe."
                });
            }
            delete user.password;

            const expireIn = 24 * 60 * 60;
            const token = jwt.sign({
                    user: user
                },
                SECRET_KEY, {
                    expiresIn: expireIn
                });

            res.header('Authorization', 'Bearer ' + token);

            return res.status(200).json({
                logged: true,
                user
            });



        } else {
            return res.json({
                error: "Ce n'est pas le bon email."
            });
        }
    }


}