const TodoController = require('./todo');

class IndexController {
  static getAll(req, res) {
    res.send('Home Page');
  }
}

module.exports = {
  IndexController,
  TodoController
}
