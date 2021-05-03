const express = require('express');

const Client = require('../classes/Client');
const Room = require('../classes/Room');

const Utils = require('../components/utils');

const router = express.Router();


router.post('/register', (req, res) => {
  req.on('data', data => {
    if (!Utils.isJSONValid(data, 'join'))
      return res.sendStatus(400);

    let reqData = JSON.parse(data);

    let general = Room.getGeneral();
    let client = new Client(reqData, general);

    res.send(JSON.stringify(client));
  });
});


module.exports = {
  router
};