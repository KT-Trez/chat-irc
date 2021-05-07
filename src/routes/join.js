const express = require('express');

const Client = require('../classes/Client');
const Message = require('../classes/Message');
const Room = require('../classes/Room');

const Utils = require('../components/utils');

const router = express.Router();


router.post('/getClients', (req, res) => {
  req.on('data', data => {
    if (!Utils.isJSONValid(data, 'join-getClients'))
      return res.sendStatus(400);
    let reqData = JSON.parse(data);

    let room = Room.list.find(room => room.id == reqData.room);
    let client = room ? room.clients.find(client => client.token == reqData.token) : null;

    if (room && client) {
      let clientList = room.resEventsList.map(data => data.client);
      res.send(JSON.stringify(clientList));
    };
  });
});

router.post('/register', (req, res) => {
  req.on('data', data => {
    if (!Utils.isJSONValid(data, 'join-register'))
      return res.sendStatus(400);
    let reqData = JSON.parse(data);

    let general = Room.getGeneral();
    let client = new Client(reqData, general);

    let resData = {
      content: 'Użytkownik {{userNick}} dołączył!',
      data: client.nick,
      type: 'join'
    };
    new Message(client, resData, general).send(general);

    res.send(JSON.stringify(client));
  });
});


module.exports = {
  router
};