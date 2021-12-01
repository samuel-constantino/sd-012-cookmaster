const { ObjectId } = require('mongodb');
const { recipeModel } = require('../models');
const { RECIPE_NOT_FOUND } = require('../erros');

const getAll = async () => {
    const result = await recipeModel.getAll();
    return result;
};

const isValidId = (id) => {
    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id) { return true; }
        return false;
    }
    return false;
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

module.exports = {
    getAll,
    getById,
    create,
};
