const { userModel } = require('../models');

const create = async (user) => {
    const result = await userModel.create(user);
    return result;
};

module.exports = {
    create,
};
