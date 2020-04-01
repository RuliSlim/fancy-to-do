const {Todo, User}  = require('../models');
const axios         = require('axios');
const key           = require('../config/config.json').rrs.key
const queryString   = require('query-string');

class TodoController {
  static getAll(req, res, next) {
    console.log('masuk todos ga sih')
    let text = 'Your Todo list are'
    const parameters = {
      key: key,
      src: text,
      hl: 'en-us',
      b64: true
    }
    const UserId = req.user.sub;
    let todo;
    Todo.findAll({where: {UserId}})
      .then((todos) => {
        todo = todos
        todos.forEach(el => text += el.title + ', ');
        parameters.src = text;
        return axios({
          methods: 'POST',
          url: 'https://api.voicerss.org/?' + queryString.stringify(parameters),
          headers: {'content-type': 'application/x-www-form-urlencoded'}    
        })
      })
      .then(response => {
        res.status(200).json({voice: response.data, todo})
      })
      .catch((err) => {
        next(err);
      });
  }

  static getOne(req, res, next) {
    const UserId = req.user.sub;
    Todo.findOne({where: {id: req.params.id, UserId}})
      .then((todo) => {
        if(todo) {
          res.status(200).json(todo);
        } else {
          throw new Error('Todo not found');
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  
  static create(req, res, next) {
    const {title, description, due_date} = req.body;
    const UserId = req.user.sub;
    User.findOne({where: {id: UserId}})
      .then(user => {
        if (!user) {
          throw new Error('User not found, please relogin')
        }

        return Todo.create({
          title,
          description,
          due_date,
          UserId
        })
      })
      .then(todo => {
        res.status(201).json(todo);
      })
      .catch(err => {
        next(err);
      });
  }

  static updateAll(req, res, next) {
    const {title, description, due_date, status} = req.body;
    const UserId = req.user.sub;
    Todo.update(
      {
        title: title,
        description: description || null,
        due_date: due_date|| null,
        status: status || false
      },
      {
        where: {id: req.params.id, UserId},
        returning: true
      })
        .then(todo => {
          if (todo[1].length) {
            res.status(200).json(todo);
          } else {
            throw new Error('Todo not found');
          }
        })
        .catch(err => {
          next(err);
        })
  }

  static updateOne(req, res, next) {
    const {id, key} = req.params;
    const UserId = req.user.sub;
    Todo.findByPk(id)
      .then(todo => {
        if (!todo) {
          throw new Error('Todo not found')
        }

        for (let i = 0; i < Object.keys(todo.dataValues).length; i++) {
          if (key ==  Object.keys(todo.dataValues)[i]) {
            return Todo.update(
              req.body,
              {
                where: {id: req.params.id, UserId},
                returning: true
              }
            );
          };
        }
        throw new Error('Not Found property with name ' + key);
      })
      .then(todo => {
        res.status(200).json(todo);
      })
      .catch(err => {
        next(err);
      })
  }

  static deleteOne(req, res, next) {
    let deletedTodo;
    const UserId = req.user.sub;
    Todo.findOne({where: {id: req.params.id, UserId}})
      .then(todo => {
        if (todo) {
          deletedTodo = todo;
          return Todo.destroy({where: {id: req.params.id}, returning: true});
        } else {
          throw new Error('Todo not found');
        }
      })
      .then(todo => {
        res.status(200).json(deletedTodo);
      })
      .catch(err  => {
        next(err);
      });
  }
}

module.exports = TodoController;