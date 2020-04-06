const axios         = require('axios');
const watson        = require('../config/config.json').watson

class VoiceController {
  static getVoice(req, res, next) {
    axios({
      method: 'POST',
      url: watson.URL + '/v1/synthesize',
      responseType: 'blob',
      headers: {
        accept: 'audio/ogg',
        'content-Type': 'application/json',
        authorization: 'Basic YXBpa2V5Om5pWmtEd1Z3N2UyOHZoMUJ1VnNmSXIzSGtQaVVpRDU1eTBRSktIU2x6SjRw'
      },
      data: {
        text: 'Test using binary code'
      }
    })
      .then(result => {
        res.status(200).json(result.data)
      })
      .catch(err => {
        next(err);
      })
  }
}

module.exports = VoiceController