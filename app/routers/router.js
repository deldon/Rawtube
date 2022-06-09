const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');

router.get('/', controllerHandler(mainController.helloWord));
router.post('/user', controllerHandler(userController.addUser));
router.patch('/user/:user_id', controllerHandler(userController.updateUser));
router.delete('/user/:user_id', controllerHandler(userController.deleteUser));

module.exports = router;
