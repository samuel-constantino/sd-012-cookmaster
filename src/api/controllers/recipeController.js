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

const formatResponse = (response, userId) => {
    const { _id, name, ingredients, preparation } = response;

    return {
        recipe: { name, ingredients, preparation, userId, _id },
    };
};

const create = async (req, res, next) => {
    try {
        const { name, ingredients, preparation } = req.body;
        const { _id: id } = req.user;

        const recipe = { name, ingredients, preparation, urlImage: '', id };

        const result = await recipeService.create(recipe);
    
        if (result.status) {
            const { status, message } = result;
            return res.status(status).json({ message });
        }
        
        return res.status(StatusCodes.CREATED).json(formatResponse(result, id));
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getById,
    create,
};
