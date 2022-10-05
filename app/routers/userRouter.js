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


router.post('/user/login', controllerHandler(userController.login)); //new

/**
 * User
 * @typedef {object} UserRegistry
 * @property {string} user_name - The title
 * @property {string} email - The artist
 * @property {string} password - image cover - binary
 * @property {string} confirm_password - The year - int64
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

router.patch('/user/thumbnail/',security.check, controllerHandler(uploadController.uploadUserThumbnail));

router.delete('/user/:user_id', controllerHandler(userController.deleteUser));

// PASSWORD
router.patch('/user/password/',security.check, controllerHandler(userController.updatePassword))

module.exports = router;
