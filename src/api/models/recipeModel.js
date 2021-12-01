const { ObjectId } = require('mongodb');
const { StatusCodes } = require('http-status-codes');
const { connection } = require('./connection');

const getById = async (id) => {
    const db = await connection();

    const recipeFound = await db.collection('recipes').findOne({ _id: ObjectId(id) });

    return recipeFound;
};

const create = async (recipe) => {
    const db = await connection();

    const result = await db.collection('recipes').insertOne(recipe);

    if (!result.insertedId) {
        return {
            code: StatusCodes.CONFLICT,
            message: result.errmsg,
        };
    }

    const recipeFound = await getById(result.insertedId);

    return recipeFound;
};

module.exports = {
    create,
};
