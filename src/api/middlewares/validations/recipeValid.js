const { INVALID_ENTRIES } = require('../../erros');
const checkFields = require('../helpers/checkFields');

const userValid = (req, _res, next) => {
    const { name, ingredients, preparation } = req.body;

    const checked = checkFields([name, ingredients, preparation]);
    
    if (!checked) next(INVALID_ENTRIES);

    next();
};

module.exports = userValid;
