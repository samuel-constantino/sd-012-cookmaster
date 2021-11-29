const { StatusCodes } = require('http-status-codes');

const { userService } = require('../services');
const { isValidUser } = require('../utils/validations/user');

const create = async (req, res) => {
    const { name, email, password, role } = req.body;

    const userValided = isValidUser({ name, email, password, role });

    // Se houver um código de erro
    if (userValided.code) {
        const { code, message } = userValided;
        res.status(code).json({ message });
    }

    const result = await userService.create({ name, email, password, role });

    if (result.code) {
        const { code, message } = result;
        res.status(code).json({ message });
    }
    
    return res.status(StatusCodes.CREATED).json(result);
};

module.exports = {
    create,
};
