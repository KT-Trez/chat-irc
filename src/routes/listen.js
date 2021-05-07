const express = require('express');

const Client = require('../classes/Client');
const Message = require('../classes/Message');
const Room = require('../classes/Room');

const Utils = require('../components/utils');

const router = express.Router();


router.get('/listenClients', (req, res) => {

  if (!req.query.room || !req.query.token) return res.sendStatus(404);

  let room = Room.list.find(room => room.id == req.query.room);
  let client = room ? room.clients.find(client => client.token == req.query.token) : null;

  if (room && client) {
    let headers = {
      'Content-Type': 'text/event-stream',
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    };
    res.writeHead(200, headers);

    let clientData = {
      client,
      res
    };
    room.resEventsList.push(clientData);

    let resData = {
      client: Client.stripSensitiveInfo(client, room),
      type: 'joined'
    };
    room.resEventsList.forEach(eventClient => eventClient.res.write(`data: ${JSON.stringify(resData)}\n\n`));

    req.on('close', () => {
      let resData = {
        client: Client.stripSensitiveInfo(client, room),
        type: 'left'
      };
      room.resEventsList.forEach(eventClient => eventClient.res.write(`data: ${JSON.stringify(resData)}\n\n`));
      let messageData = {
        content: 'Użytkownik {{userNick}} wyszedł!',
        data: client.nick,
        type: 'leave'
      };
      new Message(client, messageData, room).send(room);

      let leftClient = room.resEventsList.find(data => data.id == client.id);
      room.resEventsList.splice(room.resEventsList.indexOf(leftClient));
    });
  };
});

router.post('/listenMessages', (req, res) => {
  req.on('data', data => {
    if (!Utils.isJSONValid(data, 'listen-message'))
      return res.sendStatus(400);
    let reqData = JSON.parse(data);

    let room = Room.list.find(room => room.id == reqData.room);
    let client = room ? room.clients.find(client => client.token == reqData.token) : null;

    if (room && client) {
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