const { ALL_ENTRIES_FILLED, INCORRECT_USERNAME_OR_PASSWORD } = require('../../erros');
const checkFields = require('../helpers/checkFields');
const checkUserEmail = require('../helpers/checkUserEmail');

const userValid = (req, _res, next) => {
    const { email, password } = req.body;
    
    if (!checkUserEmail(email) || !checkFields([password])) {
        next(ALL_ENTRIES_FILLED);
    }

    if (!checkFields([email])) next(INCORRECT_USERNAME_OR_PASSWORD);

    next();
};

module.exports = userValid;
