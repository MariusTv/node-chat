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
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('ceateMessage', message);

        socket.broadcast.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
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
