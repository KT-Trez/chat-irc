const express = require('express');
const path = require('path');

const Utils = require('./src/components/utils');

const app = express();
const longPoll = require('express-longpoll')(app);
const port = process.env.PORT || 3000;


app.use((req, res, next) => {
    console.log(`${Utils.fullTimeAndDate(new Date())} [INFO] Incoming connection. | ${req.method} ${req.headers.referer} ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname + '/static')));


longPoll.create('/listen');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.post('/postMessage', (req, res) => {
    req.on('data', data => {
        if (!Utils.isJSONValid(data, 'chat-color'))
            return res.sendStatus(400);

        longPoll.publish('/listen', JSON.parse(data));
        res.sendStatus(200);
    });
});


app.listen(port, function () {
    console.log('-------------------------' + '\n' +
        'Server started' + '\n' +
        ' > port: ' + port + '\n' +
        '-------------------------');
});