const {Todo} = require('../models')

class TodoController {
  static getAll(req, res) {
    Todo.findAll()
      .then((todos) => {
        res.status(200).json(todos)
      })
      .catch((err) => {
        res.status(500).json(err)
      })
  }

  static getOne(req, res) {
    Todo.findOne({where: {id: req.params.id}})
      .then((todo) => {
        res.status(200).json(todo);
      })
      .catch((err) => {
        res.status(404).json(err);
      })
  }
  
  static create(req, res) {
    const {title, description, due_date} = req.body
    Todo.create({
      title,
      description,
      due_date
    })
      .then(todo => {
        res.status(201).json(todo)
      })
      .catch(err => {
        if (err.name === 'SequelizeValidationError') {
          res.status(400).json(err)
        } else {
          res.status(500).json(err)
        }
      })
  }

  static updateAll(req, res) {
    const {title, description, due_date, status} = req.body
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
      }
      )
        .then(todo => {
          if (todo) {
            res.status(200).json(todo)
          } else {
            res.status(404).json({message: 'Todo not found'})
          }
        })
        .catch(err => {
          if (err.name === 'SequelizeValidationError') {
            res.status(400).json(err)
          } else {
            res.status(500).json(err)
          }
        })
  }

  static updateOne(req, res) {
    const {id, key} = req.params
    const reqBody = req.body
    Todo.findByPk(id)
      .then(todo => {
        Object.keys(todo.dataValues).forEach(el => {
          if (key === el) {
            return Todo.update(
              reqBody,
              {
                where: {id: req.params.id},
                returning: true
              }
            )
          } else {
            return res.status(404).json({message: 'Not Found property with name ' + key})
          }
        })
      })
      .then(todo => {
        // console.log(todo, 'IKI') 
        // Ini kenapa ga me-return hasil todo yang baru di update ya? padahal udah dikasih option returning true
        res.status(200).json(todo)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteOne(req, res) {
    Todo.destroy({where: {id: req.params.id}, returning: true})
      .then(todo => {
        if (todo) {
          res.status(200).json(todo)
        } else {
          res.status(404).json({message: 'Todo not found'})
        }
      })
      .catch(err  => {
        res.status(500).json(err)
      })
  }
}

module.exports = TodoController