const router      = require('express').Router();
const todo        = require('./todo');
const auth        = require('./auth');
const voice       = require('./voice');
const project    = require('./project');

const {IndexController} = require('../controller');

router.get('/', IndexController.getAll);
router.use('/todos', todo);
router.use('/auth', auth);
router.use('/voices', voice);
router.use('/projects', project);

module.exports = router