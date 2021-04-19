const express = require('express');
const path = require('path');
const chat = require('./routers/chat.js');
const utils = require('./src/utils');

const server = express();
const port = process.env.PORT || 3000;


server.use((req, res, next) => {
  console.log(`[${utils.Utils.fullTimeAndDate(new Date())}] Incoming connection. [${req.method}] [${req.ip}]  [${req.hostname.referer}] [${req.url}]`);
  next();
})

server.use(express.static(path.join(__dirname + '/static')));
server.use('/chat', chat);


server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});


server.listen(port, function() {
  console.log('-------------------------' + '\n' +
    'Server started' + '\n' +
    ' > port: ' + port + '\n' +
    '-------------------------');
});