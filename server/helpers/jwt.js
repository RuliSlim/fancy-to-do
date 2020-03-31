const jwt     = require('jsonwebtoken');
const secret  = require('../config/config.json').jwt.secret;

const signToken = (user) => {
  payload = {
    iss: 'TotalSlim',
    sub: user.id,
    iat: new Date().getTime(),
    exp: 86400 // 1 day
  };
  return jwt.sign(payload, secret);
}

module.exports = signToken;