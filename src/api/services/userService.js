const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { userModel } = require('../models');

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
        return { code: StatusCodes.UNAUTHORIZED, message: 'Incorrect username or password' };
    }
    const { _idFound, emailFound, roleFound } = userFound;
    const payload = { _idFound, emailFound, roleFound };

    const token = getToken(payload);

    return { code: 200, message: token };
};

const create = async (user) => {
    const { email } = user;

    const userFound = await userModel.getByEmail(email);

    if (userFound) {
        return { code: StatusCodes.CONFLICT, message: 'Email already registered' };
    }
    const result = await userModel.create({ ...user, role: 'user' });
    return result;
};

module.exports = {
    create,
    login,
};
