const express = require('express');
const utils = require('../src/utils');


const chat = express.Router();
class Chat {
  static data = {
    clients: [],
  }
}


chat.post('/connection', (req, res) => {
  req.on('data', data => {
    let reqData = JSON.parse(data);

    let resData = {
      content: reqData.content,
      client: reqData.client,
      metadata: {
        timepstamp: utils.Utils.fullTime(new Date()),
        timepstampFull: utils.Utils.fullTimeAndDate(new Date())
      },
      type: null
    }

    console.log(reqData);

    switch (reqData.type) {

      case 'join':
        resData.type = 'join';
        Chat.data.clients.forEach(client => client.res.send(JSON.stringify(resData)));
        res.sendStatus(200);
        break;

      case 'listen':
        let newClient = {
          timestamp: Date.now(),
          res
        }

        Chat.data.clients.push(newClient);
        setTimeout(() => {
          let findClient = Chat.data.clients.find(client => client == newClient);
          findClient.res.sendStatus(504);

          let indexOfFindClient = Chat.data.clients.indexOf(findClient);
          Chat.data.clients.splice(indexOfFindClient, 1);
        }, 25000);
        break;

      case 'message':
        resData.type = 'message';
        Chat.data.clients.forEach(client => client.res.send(JSON.stringify(resData)));
        res.sendStatus(200);
        break;
    }
  });
});


module.exports = chat;