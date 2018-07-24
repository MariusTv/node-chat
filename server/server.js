const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname + '/../public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); //need this for SocketIO, can't use express()
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('ceateMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

//socket.emit - sent only to this socket
//io.emit - broadcast to everyone
//socket.broadcat.emit - broadcast to everyone except this socket

server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
