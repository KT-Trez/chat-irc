const express = require('express');
const path = require('path');
const chat = require('./src/routes/chat.js');
const join = require('./src/routes/join.js');
const listen = require('./src/routes/listen.js');

const Utils = require('./src/components/utils');

const server = express();
const port = process.env.PORT || 3000;


server.use((req, res, next) => {
  console.log(`${Utils.fullTimeAndDate(new Date())} [INFO] Incoming connection. | ${req.method} ${req.headers.referer} ${req.url}`);
  next();
})

server.use(express.static(path.join(__dirname + '/static')));
server.use('/chat', chat.router);
server.use('/join', join.router);
server.use('/listen', listen.router);


server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/static/index.html'));
});


server.listen(port, function() {
  console.log('-------------------------' + '\n' +
    'Server started' + '\n' +
    ' > port: ' + port + '\n' +
    '-------------------------');
});