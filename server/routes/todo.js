const router    = require('express').Router();
const {TodoController} = require('../controller');

router.get('/', TodoController.getAll);
router.post('/', TodoController.create);
router.get('/:id', TodoController.getOne);
router.put('/:id', TodoController.updateAll);
router.patch('/:id/:key', TodoController.updateOne);
router.delete('/:id', TodoController.deleteOne);
module.exports = router;
