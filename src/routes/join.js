const express = require('express');

const Client = require('../classes/Client');
const Room = require('../classes/Room');

const router = express.Router();


router.post('/register', (req, res) => {
  req.on('data', data => {
    let reqData = JSON.parse(data);

    let general = Room.getGeneral();
    let client = new Client(reqData, general);

    res.send(JSON.stringify(client));
  });
});


module.exports = {
  router
};