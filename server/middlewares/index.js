const {decodeToken} = require('../helpers/jwt');
const {User, Todo}        = require('../models');

class Middleware {
  static authenticate(req, res, next) {
    const {access_token} = req.headers;
    if (!access_token) {
      throw new Error('You have to login');
    }

    if (decodeToken(access_token)) {
      req.user = decodeToken(access_token);
      User.findOne({ where: {id: req.user.sub}})
        .then(user => {
          if (!user) {
            throw new Error('User not found');
          }
          next();
        })
    }
  }

  static authorized(req, res, next) {
    const UserId = req.user.sub;
    if (req.params.id) {
      Todo.findByPk(req.params.id)
        .then(todo => {
          if (!todo) {
            throw new Error('Todo not found');
          }
          if (todo.UserId != UserId) {
            throw new Error('You are not authorized');
          }
          next();
        })
        .catch(err => next(err));
    } else {
      Todo.findAll({where: {UserId}})
        .then(todos => {
          if (!todos.length) {
            res.status(200).json({message: 'You dont have todos'});
          }
          next();
        })
        .catch(err => next(err));
    }
  }

  static errorHandler(err, req, res, next) {
    console.log(err, 'IKI MESSAGE');
    console.log(err.message, 'IKI MESSAGE');
    if (err.name == 'SequelizeValidationError') {
      return res.status(400).json(err);
    } 

    if (err.name == 'JsonWebTokenError' || err.message == 'You are not authorized') {
      console.log('masuk sini')
      if (!err.message) {
        err.message = 'Invalid token, please relogin'
      }
      return res.status(401).json({error: err.message});
    }
    
    if (err.message === ('Todo not found' || 'User not found')) {
      return res.status(404).json({error: err.message});
    } 
    
    if (typeof err.message === 'string') {
      return res.status(400).json({error: err.message});
    }
    
    console.log('masuk 5000');
    return res.status(500).json(err);
  }
}

module.exports = Middleware;