const { ALL_ENTRIES_FILLED, INCORRECT_USERNAME_OR_PASSWORD } = require('../../erros');
const checkUserFields = require('../helpers/checkUserFields');
const checkUserEmail = require('../helpers/checkUserEmail');

const userValid = (req, _res, next) => {
    const { email, password } = req.body;
    if (!checkUserEmail(email) || !checkUserFields([password])) {
        next(ALL_ENTRIES_FILLED);
    }

    if (!checkUserFields([email])) next(INCORRECT_USERNAME_OR_PASSWORD);

    next();
};

module.exports = userValid;
