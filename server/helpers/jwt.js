const jwt     = require('jsonwebtoken');
const secret  = require('../config/config.json').jwt.secret;

const options = {
  iss: 'TotalSlim',
  exp: 86400 // 1 day
}
const signToken = (user) => {
  payload = {
    sub: user.id,
    iat: new Date().getTime(),
    options
  };
  return jwt.sign(payload, secret);
}

const decodeToken = (token) => {
  return jwt.verify(token, secret, options)
}

module.exports = {
  signToken,
  decodeToken
};