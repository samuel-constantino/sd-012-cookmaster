const Joi = require('joi');

const isValidLogin = (user) => {
    const schema = Joi.object({
        email: Joi.string()
            .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .rule({ message: 'Incorrect username or password' })
            .required()
            .messages({ 'any.required': 'All fields must be filled' }),
    
        password: Joi.string()
            .required()
            .messages({ 'any.required': 'All fields must be filled' }),
    });
    const { error } = schema.validate(user);
    
    if (error) {
        return { code: 401, message: error.message };
    }

    return {};
};

module.exports = isValidLogin;
