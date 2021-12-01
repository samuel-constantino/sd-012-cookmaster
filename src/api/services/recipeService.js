const { ObjectId } = require('mongodb');
const { recipeModel } = require('../models');
const { RECIPE_NOT_FOUND } = require('../erros');

const isValidId = (id) => {
    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id) { return true; }
        return false;
    }
    return false;
};

const getAll = async () => {
    const result = await recipeModel.getAll();
    return result;
};

const getById = async (id) => {
    if (!isValidId(id)) return RECIPE_NOT_FOUND;

    const result = await recipeModel.getById(id);

    if (!result) return RECIPE_NOT_FOUND;

    return result;
};

const create = async (recipe) => {
    const result = await recipeModel.create(recipe);
    return result;
};

const update = async (user, recipe) => {
    const { id: recipeId } = recipe;
    const { userId, role } = user;

    let userRecipes = [];

    if (!isValidId(recipeId)) return RECIPE_NOT_FOUND;
    
    if (role !== 'admin') {
        userRecipes = await recipeModel.getByUser(userId);
        
        const userRecipe = userRecipes.find(({ _id }) => _id.toString() === recipeId);
        
        if (!userRecipe) return RECIPE_NOT_FOUND;
    }

    const result = await recipeModel.update(recipe);

    if (!result) return RECIPE_NOT_FOUND;

    return result;
};

module.exports = {
    getAll,
    getById,
    create,
    update,
};
