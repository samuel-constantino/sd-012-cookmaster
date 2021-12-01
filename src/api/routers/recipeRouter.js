const express = require('express');

const auth = require('../middlewares/auth');
const recipeValid = require('../middlewares/validations/recipeValid');

const { recipeController } = require('../controllers');

const route = express.Router();

route.post('/', auth, recipeValid, recipeController.create);

route.get('/', recipeController.getAll);

module.exports = route;
