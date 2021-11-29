const express = require('express');
const rescue = require('express-rescue');

const { userController } = require('../controllers');

const route = express.Router();

route.post('/users', rescue(userController.create));

route.post('/login', rescue(userController.login));

module.exports = route;
