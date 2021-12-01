const { recipeModel } = require('../models');

const create = async (recipe) => {
    const result = await recipeModel.create(recipe);
    return result;
};

const getAll = async () => {
    const result = await recipeModel.getAll();
    return result;
};

module.exports = {
    create,
    getAll,
};
