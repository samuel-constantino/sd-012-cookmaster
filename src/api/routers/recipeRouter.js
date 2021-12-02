const express = require('express');

const auth = require('../middlewares/auth');
const recipeValid = require('../middlewares/validations/recipeValid');

const { recipeController } = require('../controllers');
const upload = require('../middlewares/upload');

const route = express.Router();

route.post('/', auth, recipeValid, recipeController.create);

route.get('/', recipeController.getAll);

route.get('/:id', recipeController.getById);

route.put('/:id/image', auth, upload, recipeController.uploadImage);

route.put('/:id', auth, recipeController.update);

route.delete('/:id', auth, recipeController.remove);

module.exports = route;
