const jwt = require('jsonwebtoken');

const { JWT_SECRET = 'oops' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new Error('Authorization Required');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Authorization Required');
  }

  req.user = payload;

  return next();
};
