const router  = require('express').Router()
const todo    = require('./todo')

const {IndexController} = require('../controller')

router.get('/', IndexController.getAll)
router.use('/todos', todo)

module.exports = router