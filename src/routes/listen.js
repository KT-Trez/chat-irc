const express = require('express');

const Room = require('../classes/Room');

const Utils = require('../components/utils');

const router = express.Router();


router.post('/listenMessages', (req, res) => {
  req.on('data', data => {
    if (!Utils.isJSONValid(data))
      return res.sendStatus(400);

    let reqData = JSON.parse(data);

    let room = Room.list.find(room => room.id == reqData.room);
    let client = room ? room.clients.find(client => client.token == reqData.token) : null;

    if (room && client) {
      room.resList.push(res);
      setTimeout(() => {
        let wantedRes = room.resList.find(searchedRes => searchedRes == res);
        if (wantedRes)
          room.resList.splice(room.resList.indexOf(wantedRes), 1)
      }, 25000);
    };
  });
});


module.exports = {
  router
};