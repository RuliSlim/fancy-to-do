const {decodeToken}            = require('../helpers/jwt');
const {User, Todo, Project}    = require('../models');

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
        .catch(err => next(err));
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
        .catch(err => next());
    } else {
      Todo.findAll({where: {UserId}})
        .then(todos => {
          if (!todos.length) {
            return res.status(200).json({message: 'You dont have todos'});
          }
          next();
        })
        .catch(err => next(err));
    }
  }

  static authorizedProject(req, res, next) {
    const UserId = req.user.sub;
    if (req.params.id) {
      Project.findByPk(req.params.id)
        .then(project => {
          if (!project) {
            throw new Error('Project not found');
          }
          if (project.UserId != UserId) {
            throw new Error('You are not authorized');
          }
          next();
        })
        .catch(err => next(err));
    } else {
      Project.findAll({where: {UserId}})
        .then(project => {
          if (!project.length) {
            return res.status(200).json({message: 'You dont have project yet'});
          }
          next();
        })
        .catch(err => next(err));
    }
  }

  static errorHandler(err, req, res, next) {
    if (err.name == 'SequelizeValidationError') {
      return res.status(400).json({message: 'Validation Error'});
    } 

    if (err.name == 'JsonWebTokenError' || err.message == 'You are not authorized') {
      if (!err.message) {
        err.message = 'Invalid token, please relogin'
      }
      return res.status(401).json({message: 'You are not authorized'});
    }
    
    if (err.message === ('Todo not found' || 'User not found')) {
      return res.status(404).json({error: err.message});
    } 
    
    if (typeof err.message === 'string') {
      return res.status(400).json({message: 'err.message'});
    } else {
      return res.status(500).json({message: 'Internal Server Error'});
    }
  }
}

module.exports = Middleware;