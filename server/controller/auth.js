const uuid = require('uuid');
const {User} = require('../models');
const {signToken, decodeToken} = require('../helpers/jwt');
const {compare} = require('../helpers/bcrypt');

// Google
const {OAuth2Client} = require('google-auth-library');
const client_id = require('../config/config.json').google.client_id;
const client = new OAuth2Client(client_id);

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

  static google(req, res, next) {
    console.log(req.headers, 'header')
    console.log(req.body, 'body')
    const {id_token} = req.body;
    let password = 'passwordasal'
    let email, name;
      client.verifyIdToken({
          idToken: id_token,
          audience: client_id
      })
        .then(ticket => {
          const payload = ticket.getPayload();
          email = payload['email'];
          name = payload['given_name'];
          console.log(payload, 'payload dari google')
          return User.findOne({
            where: {email}
          })
        })
        .then(user => {
          if(user && user.name == name) {
            return user
          } else {
            return User.create({
              id: uuid(),
              name,
              email,
              password
            })
          }
        })
        .then(user => {
          const token = signToken(user);
          res.status(201).json({user, access_token: token});
          console.log(user, 'User')
        })
        .catch(err => next(err));
  }
}

module.exports = AuthController