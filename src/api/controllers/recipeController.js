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

        const recipe = { name, ingredients, preparation, userId, image: '' };

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

const update = async (req, res, next) => {
    try {
        const { name, ingredients, preparation } = req.body;
        const { id } = req.params;
        const { _id: userId, role } = req.user;

        const user = { userId, role };
        const recipe = { id, name, ingredients, preparation };

        const result = await recipeService.update(user, recipe);
    
        if (result.status) {
            const { status, message } = result; 
            return res.status(status).json({ message });
        }
        
        return res.status(StatusCodes.OK).json(result);
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { _id: userId, role } = req.user;
        const user = { userId, role };

        const result = await recipeService.remove(id, user);
    
        if (result.status) {
            const { status, message } = result; 
            return res.status(status).json({ message });
        }
        
        return res.status(StatusCodes.NO_CONTENT).send();
    } catch (err) {
        next(err);
    }
};

const uploadImage = async (req, res, next) => {
    try {
        const { id: recipeId } = req.params;

        const { file } = req;
        
        const image = `localhost:3000/src/uploads/${file.filename}`;

        const { _id: userId, role } = req.user;
        const user = { userId, role };
        
        const result = await recipeService.uploadImage({ recipeId, image, user });
    
        if (result.status) {
            const { status, message } = result; 
            return res.status(status).json({ message });
        }
        
        return res.status(StatusCodes.OK).json(result);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
    uploadImage,
};
