const { StatusCodes } = require('http-status-codes');

const create = (_req, res) => {
    res.status(StatusCodes.OK).json({ message: 'OK' });
};

module.exports = {
    create,
};
