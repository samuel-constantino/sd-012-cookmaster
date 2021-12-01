const express = require('express');

const auth = require('../middlewares/auth');
const recipeValid = require('../middlewares/validations/recipeValid');

const { recipeController } = require('../controllers');

const route = express.Router();

route.post('/recipes', auth, recipeValid, recipeController.create);

module.exports = route;
