const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');
const uploadController = require('../controllers/uploadController');
const userController = require('../controllers/userController');
const security = require('../middleware/security');


// USER
router.get('/user/',security.check, controllerHandler(userController.getMyUser));
router.get('/user/search/:userName',security.check, controllerHandler(userController.get5UserByName));

router.post('/user/login', controllerHandler(userController.login)); //new
router.post('/user/register', controllerHandler(userController.addUser)); //new




router.patch('/user/',security.check, controllerHandler(userController.updateUser));
router.patch('/user/thumbnail/',security.check, controllerHandler(uploadController.uploadUserThumbnail));

router.delete('/user/:user_id', controllerHandler(userController.deleteUser));

// PASSWORD
router.patch('/user/password/',security.check, controllerHandler(userController.updatePassword))

module.exports = router;
