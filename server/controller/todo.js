const {Todo} = require('../models')

class TodoController {
  static getAll(req, res) {
    console.log('Todo All')
    Todo.findAll()
      .then((todos) => {
        res.status(200).json({todos})
      })
      .catch((err) => {
        res.status(500).json({err})
      })
  }

  static getOne(req, res) {
    console.log('Todo One')
    Todo.findOne({where: {id: req.params.id}})
      .then((todo) => {
        res.status(200).json({todo});
      })
      .catch((err) => {
        res.status(404).json({err});
      })
  }
  
  static create(req, res) {
    console.log('Todo create')
    const {title, description, due_date} = req.body
    Todo.create({
      title,
      description,
      due_date
    })
      .then(todo => [
        res.status(201).json(todo)
      ])
  }

  static updateOne(req, res) {
    console.log('Todo Update')
    const {title, description, due_date, status} = req.body
    Todo.update(
      {
        title,
        description,
        due_date,
        status
      },
      {
        where: {id: req.params.id},
        returning: true
      }
      )
        .then(todo => {
          console.log(todo)
          res.status(200).json({todo})
        })
        .catch(err => {
          res.status(500).json({err})
        })
  }
}

module.exports = TodoController