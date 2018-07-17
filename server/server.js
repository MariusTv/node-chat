const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname + '/../public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); //need this for SocketIO, can't use express()
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', {
       from: 'marius',
       text: 'hello everyone',
       createAt: '2018-07-17 11:17:00'
    });

    socket.on('createMessage', (message) => {
        console.log('ceateMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
