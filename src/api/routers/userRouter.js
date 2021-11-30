const express = require('express');

const { userController } = require('../controllers');

const route = express.Router();

route.post('/users', userController.create);

route.post('/login', userController.login);

module.exports = route;
