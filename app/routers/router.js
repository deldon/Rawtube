const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');

router.get('/', controllerHandler(mainController.helloWord));
router.post('/user', controllerHandler(userController.addUser));


module.exports = router;
