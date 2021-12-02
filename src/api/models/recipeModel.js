const { ObjectId } = require('mongodb');
const { StatusCodes } = require('http-status-codes');
const { connection } = require('./connection');

const getAll = async () => {
    const db = await connection();

    const recipes = await db.collection('recipes').find().toArray();

    return recipes;
};

const getByUser = async (userId) => {
    const db = await connection();

    const recipes = await db.collection('recipes').find({ userId }).toArray();
    
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

const update = async (recipe) => {
    const { id, name, ingredients, preparation } = recipe;
    
    const query = { _id: ObjectId(id) };

    const updateKeys = { $set: { name, ingredients, preparation } };

    // const options = { returnNewDocument: false };

    const db = await connection();

    // const recipeFound = await db.collection('recipes').findOneAndUpdate(query, updateKeys, options);
    
    await db.collection('recipes').updateOne(query, updateKeys);

    const recipeFound = await getById(id);

    return recipeFound;
};

const remove = async (id) => {
    const query = { _id: ObjectId(id) };

    const db = await connection();
    
    const { result } = await db.collection('recipes').deleteOne(query);
    
    return result.ok;
};

const uploadImage = async ({ recipeId, image }) => {
    const query = { _id: ObjectId(recipeId) };

    const updateKeys = { $set: { image } };

    const db = await connection();
    
    // const options = { returnNewDocument: true };

    // const recipeFound = await db.collection('recipes').findOneAndUpdate(query, updateKeys, options);
    
    await db.collection('recipes').updateOne(query, updateKeys);

    const recipeFound = await getById(recipeId);

    return recipeFound;
};

module.exports = {
    getAll,
    getByUser,
    getById,
    create,
    update,
    remove,
    uploadImage,
};
