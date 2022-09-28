const Joi = require('joi');


module.exports.user = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    description: Joi.string().allow(null, ''),
    avatar: Joi.string().allow(null, ''),
    new_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_new_password: Joi.ref('new_password'),

});

// Validations of updatePassword datas
module.exports.updatePassword = Joi.object({
    old_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    new_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    repeat_password: Joi.ref('new_password'),

});