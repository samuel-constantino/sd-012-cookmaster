const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const SECRET = 'batatinhafrita123';

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'missing auth token' });
  }

  try {
    const { data } = jwt.verify(token, SECRET);

    req.user = data;

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = auth;
