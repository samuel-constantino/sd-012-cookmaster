const jwt = require('jsonwebtoken');

const SECRET = 'batatinhafrita123';

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado ou informado' });
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
