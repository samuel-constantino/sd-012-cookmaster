const { StatusCodes } = require('http-status-codes');

const { recipeService } = require('../services');

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await recipeService.getById(id);
    
        if (result.status) {
            const { status, message } = result; 
            return res.status(status).json({ message });
        }
        
        return res.status(StatusCodes.OK).json(result);
    } catch (err) {
        next(err);
    }
};

const getAll = async (_req, res, next) => {
    try {
        const result = await recipeService.getAll();
    
        if (result.status) {
            const { status, message } = result; 
            return res.status(status).json({ message });
        }
        
        return res.status(StatusCodes.OK).json(result);
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const { name, ingredients, preparation } = req.body;
        const { _id: userId } = req.user;

        const recipe = { name, ingredients, preparation, urlImage: '', userId };

        const result = await recipeService.create(recipe);
    
        if (result.status) {
            const { status, message } = result;
            return res.status(status).json({ message });
        }

        const { _id } = result;

        const formatedResponse = {
            recipe: { name, ingredients, preparation, userId, _id },
        };
        
        return res.status(StatusCodes.CREATED).json(formatedResponse);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getById,
    create,
};
