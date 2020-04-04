const axios         = require('axios');
const watson        = require('../config/config.json').watson

class VoiceController {
  static getVoice(req, res, next) {
    console.log('masuk', 'Basic ' + watson.key)
    // axios({
    //   method: 'post',
    //   url: 'https://api.eu-gb.text-to-speech.watson.cloud.ibm.com/instances/f8a5f28e-e529-41d9-bd32-7ff3509c5043/v1/synthesize?voice=en-US_LisaVoice',
    //   headers: {
    //     accept: 'audio/wav',
    //     'content-type': 'application/json',
    //     authorization: 'Basic YXBpa2V5Oi1rY2tyZGw4VDdURmlIRHpjWHhlN3p4MUo1aVMzMVowOGNFUHhfb0tnYUM1'
    //   },
    //   data: {
    //     text: 'Yo, bisa ga?',
    //   },
    //   responseType: 'blob'
    // })
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
        // console.log(result);
        // console.log(result.body);
        res.status(200).json(result.data)
        // console.log(response);
        // audio.pause();
        // audio.src = URL.createObjectURL(response.data);
        // audio.play();
      })
      .catch(err => {
        console.log(err)
      })
  }
}

module.exports = VoiceController