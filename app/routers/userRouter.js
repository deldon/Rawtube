const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');
const uploadController = require('../controllers/uploadController');
const userController = require('../controllers/userController');
const security = require('../middleware/security');


// USER
/**
 * 
 * GET /user/
 * @summary Get the user by id
 * @tags USER
 * @return {object} 200 - success response
 * @security BearerAuth
 * @example response - 200 - example success response
 * {
 * 	{
 * "id": 1,
 * "name": "updatedone2",
 * "url_thumbnail": "81537be3-3745-4f5b-b437-ac86fadddc3b.zip",
 * "email": "updatedone2@gmail.com"
 * }
 */
router.get('/user/',security.check, controllerHandler(userController.getMyUser));
/**
 * 
 * GET /user/search/:userName
 * @summary Get the users by Name
 * @tags USER
 * @param {text} userName.path.required - user_name param
 * @return {object} 200 - success response
 * @security BearerAuth
 * @example response - 200 - example success response
 * [
 * {
 *   "id": 11,
 *   "name": "Jean louis"
 * },
 * {
 *   "id": 12,
 *   "name": "Jeanjean"
 * },
 * {
 *   "id": 14,
 *   "name": "Jeanj"
 * }
 * ]
 */
router.get('/user/search/:userName', controllerHandler(userController.get5UserByName));

/**
 * User
 * @typedef {object} UserLogin
 * @property {string} email - The user email
 * @property {string} password - The user password
 */
/**
 * POST /user/login
 * @summary Login of a user
 * @tags USER
 * @param {UserLogin} request.body.required - UserRegistry json
 * @return {object} 200 - success response
 * @example response - 200 - example success response
 * {
 *  "id": 15,
 * "name": "Jeanje",
 * "email": "testsearch10@gmail.com",
 * "url_thumbnail": "user.jpg",
 * "created_at": "2022-10-05T13:23:34.833Z",
 * "updated_at": "2022-10-05T13:23:34.833Z"
 *  }
 */
router.post('/user/login', controllerHandler(userController.login)); //new

/**
 * User
 * @typedef {object} UserRegistry
 * @property {string} user_name - The user name
 * @property {string} email - The user email
 * @property {string} password - The user password
 * @property {string} confirm_password - The user confirmation password
 */
/**
 * POST /user/register
 * @summary Register a new user
 * @tags USER
 * @param {UserRegistry} request.body.required - UserRegistry json
 * @return {object} 200 - success response
 * @example response - 200 - example success response
 * {
 *  "id": 15,
 * "name": "Jeanje",
 * "email": "testsearch10@gmail.com",
 * "url_thumbnail": "user.jpg",
 * "created_at": "2022-10-05T13:23:34.833Z",
 * "updated_at": "2022-10-05T13:23:34.833Z"
 *  }
 */
router.post('/user/register', controllerHandler(userController.addUser)); //new


/**
 * User
 * @typedef {object} UserPatch
 * @property {string} user_name - The title
 * @property {string} email - The artist
 */
/**
 * PATCH /user/register
 * @summary Update a user by id
 * @tags USER
 * @security BearerAuth
 * @param {UserPatch} request.body.required - UserPatch json
 * @return {object} 200 - success response
 * @example response - 200 - example success response
 * {
 *  "id": 15,
 * "name": "Jeanje",
 * "email": "testsearch10@gmail.com",
 * "url_thumbnail": "user.jpg",
 * "created_at": "2022-10-05T13:23:34.833Z",
 * "updated_at": "2022-10-05T13:23:34.833Z"
 *  }
 */
router.patch('/user/',security.check, controllerHandler(userController.updateUser));

/**
 * User
 * @typedef {object} UserThumbnail
 * @property {string} sampleFile - Thumbnail file - binary
 */
/**
 * PATCH /user/thumbnail/
 * @summary upload a thumbnail
 * @tags USER
 * @param {UserThumbnail} request.body.required - Thumbnail file - multipart/form-data
 * @return {object} 200 - success response
 * @security BearerAuth
 * @example response - 200 - example success response
 * {
 *  "url_thumbnail": "ba058e37-4f8e-4ce9-9a51-6e751d121260.jpg",
 *  "uploaded": true
 * }
 */
router.patch('/user/thumbnail/',security.check, controllerHandler(uploadController.uploadUserThumbnail));

router.delete('/user/:user_id', controllerHandler(userController.deleteUser));

// PASSWORD
/**
 * User
 * @typedef {object} UserPatchPassword
 * @property {string} new_password - The new password
 * @property {string} old_password - The old password
 * @property {string} repeat_password - The repeat password
 */
/**
 * PATCH /user/password/
 * @summary Update user password
 * @tags USER
 * @security BearerAuth
 * @param {UserPatchPassword} request.body.required - UserPatchPassword json
 * @return {object} 200 - success response
 * @example response - 200 - example success response
 * {
 *  "password_changed": true
 * }
 */
router.patch('/user/password/',security.check, controllerHandler(userController.updatePassword))

module.exports = router;
