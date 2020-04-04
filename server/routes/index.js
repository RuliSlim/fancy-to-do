const router  = require('express').Router();
const todo    = require('./todo');
const auth    = require('./auth');
const voice  = require('./voice');

const {IndexController} = require('../controller');

router.get('/', IndexController.getAll);
router.use('/todos', todo);
router.use('/auth', auth);
router.use('/voices', voice);

module.exports = router