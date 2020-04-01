const router            = require('express').Router();
const {AuthController}  = require('../controller');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/google', AuthController.google);

module.exports = router;