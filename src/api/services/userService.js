const { StatusCodes } = require('http-status-codes');
const { userModel } = require('../models');

const isUnicEmail = async (email) => {
    const user = await userModel.getByEmail(email);
    if (!user) return true;

    return false;
};

const create = async (user) => {
    const { email } = user;

    const unicEmail = await isUnicEmail(email);
    if (!unicEmail) {
        return { code: StatusCodes.CONFLICT, message: 'Email already registered' };
    }
    const result = await userModel.create({ ...user, role: 'user' });
    return result;
};

module.exports = {
    create,
};
