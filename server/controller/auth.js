const {User} = require('../models');
const {signToken} = require('../helpers/jwt');
const {compare} = require('../helpers/bcrypt');

class AuthController {
  static register(req, res, next) {
    const {name, email, password} = req.body
    User.create({
      name,
      email,
      password
    })
      .then(user => {
        console.log(user, 'Ini user')
        const token = signToken(user);
        res.status(201).json({user, access_token: token});
      })
      .catch(err => next(err));
  }

  static login(req, res, next) {
    const {email, password} = req.body;
    User.findOne({where: {email}})
      .then((user) => {
        if (!user) {
          throw new Error('User not found');
        }

        const token = signToken(user);
        if (compare(password, user.password)) {
          res.status(201).json({user, access_token: token});
        }

        throw new Error('Email or Password incorrect');
      })
      .catch(err => next(err));
  }
}

module.exports = AuthController