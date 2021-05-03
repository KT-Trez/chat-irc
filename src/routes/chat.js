const express = require('express');

const Message = require('../classes/Message');
const Room = require('../classes/Room');

const Database = require('../components/db_operation');

const router = express.Router();


router.post('/message', (req, res) => {
  req.on('data', data => {
    let reqData = JSON.parse(data);

    let room = Room.list.find(room => room.id == reqData.room);
    let client = room ? room.clients.find(client => client.token == reqData.token) : null;

    if (room && client) {
      let message = new Message(client, reqData, room).emojify();

      room.messagesCount++;
      room.resList.forEach(res => res.send(message));
      room.resList = [];

      Database.write(message);
      res.sendStatus(200);
    } else
      res.sendStatus(400);
  });
});


module.exports = {
  router
};