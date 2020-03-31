const jwt     = require('jsonwebtoken');
const secret  = require('../config/config.json').jwt.secret;

const signToken = (user) => {
  payload = {
    iss: 'TotalSlim',
    sub: user.id,
    iat: new Date().getTime(),
  };
  return jwt.sign(payload, secret, {expiresIn: '1h'});
}

const decodeToken = (token) => {
  return jwt.verify(token, secret, {
    expiresIn: '1h'
  })
}

module.exports = {
  signToken,
  decodeToken
};