const router    = require('express').Router();
const {TodoController} = require('../controller');
const middlewares = require('../middlewares')

router.get('/', TodoController.getAll);
router.post('/', middlewares.authenticate, TodoController.create);
router.get('/:id', TodoController.getOne);
router.put('/:id', TodoController.updateAll);
router.patch('/:id/:key', TodoController.updateOne);
router.delete('/:id', TodoController.deleteOne);

module.exports = router;
