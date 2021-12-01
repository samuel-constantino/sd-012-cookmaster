const jwt = require('jsonwebtoken');

const { userModel } = require('../models');
const { INCORRECT_USERNAME_OR_PASSWORD, EMAIL_ALREADY_REGISTERED } = require('../erros');

const SECRET = 'batatinhafrita123';
const OPTIONS = {
    expiresIn: '1d',
    algorithm: 'HS256',
};

const login = async ({ email, password }) => {
    const userFound = await userModel.getByEmail(email);

    if (!userFound || userFound.password !== password) {
        return INCORRECT_USERNAME_OR_PASSWORD;
    }

    const { password: passBD, name, ...payload } = userFound;

    const token = jwt.sign({ data: payload }, SECRET, OPTIONS);

    return { token };
};

const create = async (user) => {
    const { email } = user;

    const userFound = await userModel.getByEmail(email);

    if (userFound) return EMAIL_ALREADY_REGISTERED;
    
    const result = await userModel.create({ ...user, role: 'user' });
    return result;
};

module.exports = {
    create,
    login,
};
