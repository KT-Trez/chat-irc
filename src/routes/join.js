const express = require('express');

const Client = require('../classes/Client');
const Room = require('../classes/Room');

const Utils = require('../components/utils');

const router = express.Router();


router.post('/getClients', (req, res) => {
  req.on('data', data => {
    if (!Utils.isJSONValid(data, 'join-getClients'))
      return res.sendStatus(400);
    let reqData = JSON.parse(data);

    let room = Room.list.find(room => room.id == reqData.room);
    let clientData = room ? room.clients.find(clientData => clientData.client.token == reqData.token) : null;

    if (room && clientData) {
      let clientList = room.clients.map(data => data.client);
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

    res.send(JSON.stringify(client));
  });
});

router.post('/status', (req, res) => {
  req.on('data', data => {
    if (!Utils.isJSONValid(data, 'join-status'))
      return res.sendStatus(400);
    let reqData = JSON.parse(data);

    let room = Room.list.find(room => room.id == reqData.room);
    let clientData = room ? room.clients.find(clientData => clientData.client.token == reqData.token) : null;

    if (room && clientData.client && reqData.status) {
      clientData.client.status = reqData.status;

      let data = {
        client: Client.stripSensitiveInfo(clientData.client, room),
        type: 'status'
      };
      room.clients.forEach(eventClient => eventClient.res.write(`data: ${JSON.stringify(data)}\n\n`));

      res.sendStatus(200);
    };
  });
});


module.exports = {
  router
};