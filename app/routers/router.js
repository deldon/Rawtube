const express = require('express');

const router = express.Router();
const controllerHandler = require('../helpers/controllerHandler');

const mainController = require('../controllers/mainController');

router.get('/', controllerHandler(mainController.helloWord));


module.exports = router;
