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

    },

    deleteUser: async (req, res, next) => {
        const userId = req.params.user_id
        const user = await DataMapper.deleteUser(userId)
        console.log(req.params)
        if (user) {
            debug(`> deleteUser()`);
            res.json({message:`user :${userId} is removed`, id:Number(userId)});
        } else {
            next();
        }

    },

    updateUser: async (req, res, next) => {

        form = {
            name: req.body.name,
            email: req.body.email,
            description: req.body.description,
            avatar: req.body.avatar
        }
        console.log(form)
        const user = await DataMapper.updateUser(form, req.params.user_id);
        console.log(user)
        if (user) {
            debug(`> updateUser()`);
            delete user.password;
            res.json(user);
        } else {
            next();
        }
    },

    signin: (request, response) => {
        response.render(`pages/signin`);
    },

    login: async (req,res,next)=> {

        const user = await DataMapper.getUserByEmail(req.body.email)
        debug(user);
        
        if(user){
        
        const validPwd = await bcrypt.compare(req.body.password, user.password);
        debug(validPwd);
            if (!validPwd) {
                return res.json({
                error: "Ce n'est pas le bon mot de passe."
                });
            }
            req.session.regenerate(function (err) {
                if (err) next(err)

                // store user information in session, typically a user id
                req.session.user = user
                req.session.save(function (err) {
                    if (err) return next(err)
                    res.redirect('/')
                  })

            })         
        } else {
            return res.json({
                error: "Ce n'est pas le bon email."
            });
        }
    }
    

}