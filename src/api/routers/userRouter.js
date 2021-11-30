const express = require('express');

const userValid = require('../middlewares/validations/userValid');
const loginValid = require('../middlewares/validations/loginValid');
const { userController } = require('../controllers');

const route = express.Router();

route.post('/users', userValid, userController.create);

route.post('/login', loginValid, userController.login);

module.exports = route;
