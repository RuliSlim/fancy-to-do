const TodoController      = require('./todo');
const AuthController      = require('./auth');
const VoiceController     = require('./voice');
const ProjectController   = require('./project');

class IndexController {
  static getAll(req, res) {
    res.send('Home Page');
  }
}

module.exports = {
  IndexController,
  TodoController,
  AuthController,
  VoiceController,
  ProjectController
}
