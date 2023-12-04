// Node Server that handles socket.io connections

const io = require('socket.io')(5000)

const users = {};

//Lets the other users know, if a new user joins the chat
io.on('connection', (socket) => {
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });


    //Broadcasts messages to other users
    socket.on('send', message =>{
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });


    //Lets users know, if a user leaves the chat
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id]
    });

});