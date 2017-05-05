const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,"../public");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

const {Users} = require('./utils/users.js');
const {generateMessage,generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');

let users = new Users();

app.use(express.static(publicPath));


io.on('connection', (socket) =>{

  socket.on('join', (params,callback) => {

    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name  are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id); //разобраться
    users.addUser(socket.id,params.name,params.room);


    io.to(params.room).emit('updateUserList',users.getUserList(params.room));

    socket.emit('newMessage',
      generateMessage(`Administrator`,`Welcome to our chat, ${params.name}`)
    );

    socket.broadcast.to(params.room).emit('newMessage',
      generateMessage(`Administrator`,`${params.name} has connected to our chat`)
    );

    callback();
  });

  socket.on('createMessage', (message,callback) =>{
    let user = users.getUser(socket.id)

    if(user)
      io.to(user.room).emit('newMessage', generateMessage(user.name,message.text));

    callback();
  });

  socket.on('createLocationMessage', (coords) =>{

    let user = users.getUser(socket.id)

    if(user)
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name,
        coords.latitude,coords.longitude));
  });

  socket.on('disconnect', () =>{
    let user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit(
        'newMessage',
        generateMessage(
          'Administrator',
          `${user.name} has left the room`));
    }
  });

});

server.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});
