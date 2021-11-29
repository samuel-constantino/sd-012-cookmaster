const { StatusCodes } = require('http-status-codes');

const { userService } = require('../services');
const { isValidUser, isValidLogin } = require('../utils/validations/user');

const formatResponse = (response) => {
    const { _id, name, email, role } = response;

    return {
        user: { name, email, role, _id },
    };
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const loginValided = isValidLogin({ email, password });

    // Se houver um código de erro
    if (loginValided.code) {
        const { code, message } = loginValided;
        res.status(code).json({ message });
    }
    
    const result = await userService.login({ email, password });

    if (result.code) {
        const { code, message } = result;
        res.status(code).json({ message });
    }
    
    return res.status(StatusCodes.OK).json(formatResponse(result));
};

const create = async (req, res) => {
    const { name, email, password } = req.body;

    const userValided = isValidUser({ name, email, password });

    // Se houver um código de erro
    if (userValided.code) {
        const { code, message } = userValided;
        res.status(code).json({ message });
    }

    const result = await userService.create({ name, email, password });

    if (result.code) {
        const { code, message } = result;
        res.status(code).json({ message });
    }
    
    return res.status(StatusCodes.CREATED).json(formatResponse(result));
};

module.exports = {
    create,
    login,
};
