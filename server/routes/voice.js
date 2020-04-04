const router            = require('express').Router();
const {VoiceController}          = require('../controller');

router.post('/', VoiceController.getVoice)

module.exports = router