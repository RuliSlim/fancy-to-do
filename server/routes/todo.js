const router    = require('express').Router();
const {TodoController} = require('../controller');
const middlewares = require('../middlewares')

router.use(middlewares.authenticate);

router.get('/', middlewares.authorized, TodoController.getAll);
router.post('/', TodoController.create);
router.get('/:id', middlewares.authorized, TodoController.getOne);
router.put('/:id', middlewares.authorized, TodoController.updateAll);
router.patch('/:id/:key', middlewares.authorized, TodoController.updateOne);
router.delete('/:id', middlewares.authorized, TodoController.deleteOne);

module.exports = router;