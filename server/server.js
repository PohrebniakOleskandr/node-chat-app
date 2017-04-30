const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,"../public");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

io.on('connection', (socket) =>{

  socket.emit('newMessage',
    {from:'Администратор', text:'Добро пожаловать'}
  );

  socket.broadcast.emit('newMessage',
    {from:'Администратор',
    text:'Новый пользователь присоеденился к комнате',
    createdAt:new Date().getTime()}
  );

  socket.on('disconnect', () =>{
    console.log('Client has disconnected from server via socket...');
  });

  socket.on('createMessage', (message) =>{
    message.createdAt = new Date().getTime();
    io.emit('newMessageEvent',message);
  });

});

server.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});
