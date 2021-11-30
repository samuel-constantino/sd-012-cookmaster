const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const { userModel } = require('../models');
const { INCORRECT_USERNAME_OR_PASSWORD, EMAIL_ALREADY_REGISTERED } = require('../erros');

const getToken = (payload) => {
    const SECRET = 'batatinhafrita123';
    const OPTIONS = {
        expiresIn: '1d',
        algorithm: 'HS256',
    };

    const token = jwt.sign(payload, SECRET, OPTIONS);

    return token;
};

const login = async ({ email, password }) => {
    const userFound = await userModel.getByEmail(email);

    if (!userFound || userFound.password !== password) {
        return INCORRECT_USERNAME_OR_PASSWORD;
    }

    const { _idFound, emailFound, roleFound } = userFound;
    const payload = { _idFound, emailFound, roleFound };

    const token = getToken(payload);

    return { code: StatusCodes.OK, message: token };
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
