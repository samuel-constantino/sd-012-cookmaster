const express = require('express');
const rescue = require('express-rescue');

const { userController } = require('../controllers');

const route = express.Router();

route.post('/', rescue(userController.create));

module.exports = route;
