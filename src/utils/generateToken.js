
const jwt = require('jsonwebtoken');

module.exports = function generateToken(userId, type = 'access') {
  const isRefresh = type === 'refresh';
  const secret = isRefresh ? process.env.REFRESH_TOKEN_SECRET : process.env.JWT_SECRET;
  const expiresIn = isRefresh ? process.env.REFRESH_TOKEN_EXPIRES_IN : process.env.JWT_EXPIRES_IN;

  return jwt.sign({ id: userId }, secret, { expiresIn });
}
