const uuid = require('uuid');
const {User} = require('../models');
const {signToken} = require('../helpers/jwt');
const {compare} = require('../helpers/bcrypt');

class AuthController {
  static register(req, res, next) {
    const {name, email, password} = req.body
    console.log(req.body, 'masuk ga sih?')
    User.create({
      id: uuid(),
      name,
      email,
      password
    })
      .then(user => {
        const token = signToken(user);
        console.log(token, 'Ini user')
        res.status(201).json({user, access_token: token});
      })
      .catch(err => next(err));
  }

  static login(req, res, next) {
    const {email, password} = req.body;
    console.log(req.body)
    console.log('Masuk sini ga?')
    console.log(email, password)
    User.findOne({where: {email}})
      .then((user) => {
        if (!user) {
          throw new Error('User not found');
        }

        if (compare(password, user.password)) {
          const token = signToken(user);
          res.status(201).json({user, access_token: token});
        } else {
          throw new Error('Email or Password incorrect');
        }

      })
      .catch(err => next(err));
  }
}

module.exports = AuthController