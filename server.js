const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const { generateMessage } = require('./chat-app/utils/message');
const { isRealString } = require('./chat-app/utils/validation');
const { Users } = require('./chat-app/utils/users');
const publicPath = path.join(__dirname, './../public');
const server = http.createServer(app);
const io = socketIO(server);
const users = new Users();
const port = process.env.PORT || 63342;

app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('New user connected');

socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
    return callback('Name and room name are required.');
}

socket.join(params.room);
users.removeUser(socket.id);
users.addUser(socket.id, params.name, params.room);

io.to(params.room).emit('updateUserList', users.getUserList(params.room));
socket.emit('newMessageCenter', generateMessage('Admin', 'Welcome to the chat app'));
socket.broadcast.to(params.room).emit('newMessageCenter', generateMessage('Admin', `${params.name} has joined.`));
callback();
});

socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);

if (user && isRealString(message.text)) {
    socket.broadcast.to(user.room).emit('newMessageLeft', generateMessage(user.name, message.text));
    socket.emit('newMessage', generateMessage(user.name, message.text));
}
callback();
});

socket.on('createLocationMessage', (coords) => {
    const user = users.getUser(socket.id);

if (user) {
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
}
});

socket.on('disconnect', () => {
    console.log('User was disconnected');
const user = users.removeUser(socket.id);

if (user) {
    io.to(user.room).emit('updateUserList', users.getUserList(user.room));
    io.to(user.room).emit('newMessageCenter', generateMessage('Admin', `${user.name} has left.`));
}
});
});
app.use(express.static('app'));

app.listen(port, () => console.log(`Server is up on port ${port}`));