const express = require('express');

const Client = require('../classes/Client');
const Message = require('../classes/Message');
const Room = require('../classes/Room');

const Utils = require('../components/utils');

const router = express.Router();


router.get('/listenClients', (req, res) => {

  if (!req.query.room || !req.query.token) return res.sendStatus(404);

  let room = Room.list.find(room => room.id == req.query.room);
  let clientData = room ? room.clients.find(clientData => clientData.client.token == req.query.token) : null;

  if (room && clientData) {
    res.set({
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache',
      'Transfer-Encoding': 'Chucked'
    });
    res.write('\n');
    clientData.res = res;


    let messageData = {
      content: 'Użytkownik {{userNick}} dołączył!',
      data: clientData.client.nick,
      type: 'join'
    };
    new Message(clientData.client, messageData, room).send(room);

    let data = {
      client: Client.stripSensitiveInfo(clientData.client, room),
      type: 'joined'
    };
    room.clients.forEach(eventClient => eventClient.res.write(`data: ${JSON.stringify(data)}\n\n`));

    req.on('close', () => {
      console.log('Wyrzucono');
      room.clients.splice(room.clients.indexOf(clientData), 1);

      let messageData = {
        content: 'Użytkownik {{userNick}} wyszedł!',
        data: clientData.client.nick,
        type: 'leave'
      };
      new Message(clientData.client, messageData, room).send(room);

      let data = {
        client: Client.stripSensitiveInfo(clientData.client, room),
        type: 'left'
      };
      room.clients.forEach(eventClient => eventClient.res.write(`data: ${JSON.stringify(data)}\n\n`));
    });
  };
});

router.post('/listenMessages', (req, res) => {
  req.on('data', data => {
    if (!Utils.isJSONValid(data, 'listen-message'))
      return res.sendStatus(400);
    let reqData = JSON.parse(data);

    let room = Room.list.find(room => room.id == reqData.room);
    let clientData = room ? room.clients.find(clientData => clientData.client.token == reqData.token) : null;

    if (room && clientData) {
      room.resList.push(res);
      setTimeout(() => {
        let wantedRes = room.resList.find(searchedRes => searchedRes == res);
        if (wantedRes)
          room.resList.splice(room.resList.indexOf(wantedRes), 1);
      }, 25000);
    };
  });
});

module.exports = {
  router
};