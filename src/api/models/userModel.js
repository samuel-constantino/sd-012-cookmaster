const { ObjectId } = require('mongodb');
const { StatusCodes } = require('http-status-codes');
const { connection } = require('./connection');

const getById = async (id) => {
    const db = await connection();

    const userFound = await db.collection('users').findOne({ _id: ObjectId(id) });

    return userFound;
};

const create = async (user) => {
    const db = await connection();

    const result = await db.collection('users').insertOne(user);

    if (!result.insertedId) {
        return {
            code: StatusCodes.CONFLICT,
            message: result.errmsg,
        };
    }

    const userFound = await getById(result.insertedId);

    return userFound;
};

module.exports = {
    create,
};
