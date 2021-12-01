const { ObjectId } = require('mongodb');
const { StatusCodes } = require('http-status-codes');
const { connection } = require('./connection');

const getAll = async () => {
    const db = await connection();

    const recipes = await db.collection('recipes').find().toArray();

    return recipes;
};

const getById = async (id) => {
    const db = await connection();

    const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

    return recipe;
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
    getAll,
};
