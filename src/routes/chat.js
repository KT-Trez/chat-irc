const express = require('express');

const Message = require('../classes/Message');
const Room = require('../classes/Room');

const Database = require('../components/db_operation');
const Utils = require('../components/utils');

const router = express.Router();


router.post('/color', (req, res) => {
  req.on('data', data => {
    if (!Utils.isJSONValid(data, 'chat-color'))
      return res.sendStatus(400);
    let reqData = JSON.parse(data);

    let room = Room.list.find(room => room.id == reqData.room);
    let clientData = room ? room.clients.find(clientData => clientData.client.token == reqData.token) : null;

    if (room && clientData.client && reqData.color) {
      clientData.client.color = reqData.color;

      res.sendStatus(200);
    } else
      res.sendStatus(400);
  });
});

router.post('/message', (req, res) => {
  req.on('data', data => {
    if (!Utils.isJSONValid(data, 'chat-message'))
      return res.sendStatus(400);
    let reqData = JSON.parse(data);

    let room = Room.list.find(room => room.id == reqData.room);
    let clientData = room ? room.clients.find(clientData => clientData.client.token == reqData.token) : null;

    if (room && clientData) {
      let message = new Message(clientData.client, reqData, room).emojify().send(room);

      Database.write(message);
      res.sendStatus(200);
    } else
      res.sendStatus(400);
  });
});


module.exports = {
  router
};