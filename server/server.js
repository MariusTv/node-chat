const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var {generateMessage, generateLocationMessage} = require('./utils/message');
var {isRealString} = require('./utils/validation');
var {Users} = require('./utils/users');

const publicPath = path.join(__dirname + '/../public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app); //need this for SocketIO, can't use express()
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('updateRoomList', users.getRoomList());

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || (!isRealString(params.room) && !isRealString(params.roomSelect))) {
            return callback('Name and room name are required');
        }

        if (isRealString(params.room)) {
            var room = params.room.toUpperCase();
        } else {
            var room = params.roomSelect.toUpperCase();
        }

        socket.join(room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, room);

        io.to(room).emit('updateUserList', users.getUserList(room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        socket.broadcast.emit('updateRoomList', users.getRoomList());

        callback();
    });

    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }

        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} jas left`));
        }
    });
});

//socket.emit - sent only to this socket
//io.emit - broadcast to everyone
//io.to('name').emit - broadcast to everone in the channel
//socket.broadcast.emit - broadcast to everyone except this socket
//socket.broadcast.to('name').emit - broadcast to everyone in the channel except this socket
//socket.join('name') - join channel
//socket.leave('name') - leave channel

server.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
