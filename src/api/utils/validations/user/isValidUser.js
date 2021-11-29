const Joi = require('joi');

const isValidUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({ 'any.required': 'Invalid entries. Try again.' }),
    
        email: Joi.string()
            .regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)
            .rule({ message: 'Invalid entries. Try again.' })
            .required()
            .messages({ 'any.required': 'Invalid entries. Try again.' }),
    
        password: Joi.string()
            .required()
            .messages({ 'any.required': 'Invalid entries. Try again.' }),
            
        role: Joi.string(),
    });
    const { error } = schema.validate(user);
    
    if (error) {
        return { code: 400, message: error.message };
    }

    return {};
};

module.exports = isValidUser;
