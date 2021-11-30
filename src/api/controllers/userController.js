const { StatusCodes } = require('http-status-codes');

const { userService } = require('../services');
// const { isValidLogin } = require('../utils/validations/user');

const formatResponse = (response) => {
    const { _id, name, email, role } = response;

    return {
        user: { name, email, role, _id },
    };
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
    
        // const loginValided = isValidLogin({ email, password });
    
        // // Se houver um código de erro
        // if (loginValided.code) {
        //     const { code, message } = loginValided;
        //     return res.status(code).json({ message });
        // }
        
        const result = await userService.login({ email, password });
    
        if (result.code) {
            const { code, message } = result;
            return res.status(code).json({ message });
        }
        
        return res.status(StatusCodes.OK).json(formatResponse(result));
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
    
        const result = await userService.create({ name, email, password });
    
        if (result.code) {
            const { code, message } = result;
            return res.status(code).json({ message });
        }
        
        return res.status(StatusCodes.CREATED).json(formatResponse(result));
    } catch (err) {
        next(err);
    }
};

module.exports = {
    create,
    login,
};
