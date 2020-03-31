const {Todo} = require('../models');

class TodoController {
  static getAll(req, res, next) {
    Todo.findAll()
      .then((todos) => {
        res.status(200).json(todos);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getOne(req, res, next) {
    Todo.findOne({where: {id: req.params.id}})
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
    Todo.create({
      title,
      description,
      due_date
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
    Todo.update(
      {
        title: title,
        description: description || null,
        due_date: due_date|| null,
        status: status || false
      },
      {
        where: {id: req.params.id},
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
                where: {id: req.params.id},
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
    Todo.findByPk(req.params.id)
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