const TodoController = require('./todo');
const AuthController = require('./auth')

class IndexController {
  static getAll(req, res) {
    res.send('Home Page');
  }
}

module.exports = {
  IndexController,
  TodoController,
  AuthController
}
