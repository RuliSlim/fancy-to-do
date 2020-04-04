const router                  = require('express').Router();
const {ProjectController}     = require('../controller');
const middlewares             = require('../middlewares');

router.use(middlewares.authenticate);

router.get('/', ProjectController.getAll);
router.post('/', ProjectController.create);
router.get('/:id', middlewares.authorizedProject, ProjectController.getOne);
router.put('/:id', middlewares.authorizedProject, ProjectController.update);

module.exports = router