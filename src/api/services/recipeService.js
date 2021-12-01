const { recipeModel } = require('../models');

const create = async (recipe) => {
    const result = await recipeModel.create(recipe);
    return result;
};

module.exports = {
    create,
};
