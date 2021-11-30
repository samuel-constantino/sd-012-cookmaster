const { StatusCodes } = require('http-status-codes');

const INVALID_ENTRIES = {
    status: StatusCodes.BAD_REQUEST,
    message: 'Invalid entries. Try again.',
};

const ALL_ENTRIES_FILLED = {
    status: StatusCodes.UNAUTHORIZED,
    message: 'All fields must be filled',
};

const INCORRECT_USERNAME_OR_PASSWORD = {
    status: StatusCodes.UNAUTHORIZED,
    message: 'Incorrect username or password',
};

const EMAIL_ALREADY_REGISTERED = {
    status: StatusCodes.CONFLICT,
    message: 'Email already registered',
};

module.exports = {
    INVALID_ENTRIES,
    ALL_ENTRIES_FILLED,
    INCORRECT_USERNAME_OR_PASSWORD,
    EMAIL_ALREADY_REGISTERED,
};
