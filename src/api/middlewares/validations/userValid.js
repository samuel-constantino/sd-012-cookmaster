const { INVALID_ENTRIES } = require('../../erros');
const checkUserFields = require('../helpers/checkUserFields');
const checkUserEmail = require('../helpers/checkUserEmail');

const userValid = (req, _res, next) => {
    const { name, email, password } = req.body;

    const checked = checkUserFields([name, email, password]) && checkUserEmail(email);
    if (!checked) next(INVALID_ENTRIES);

    next();
};

module.exports = userValid;
