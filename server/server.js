const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,"../public");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;
const {generateMessage} = require('./utils/message.js');

app.use(express.static(publicPath));

io.on('connection', (socket) =>{

  /*При подключении юзера отправляем ему сообщение от админа*/
  socket.emit('newMessage',
    generateMessage('Администратор','Добро пожаловать в наш уютный чатик')
  );

  /*Так же отправляем через его сокет всем кроме него сообщение*/
  socket.broadcast.emit('newMessage',
    generateMessage('Администратор','Новый пользователь присоеденился к комнате')
  );

  /*В случае, если он ушел - сообщаем это в консоль*/
  socket.on('disconnect', () =>{
    console.log('Client has disconnected from server via socket...');
  });

  /*В случае, если он написал, то отправить сообщение всем*/
  socket.on('createMessage', (message) =>{
    io.emit('newMessage', generateMessage(message.from,message.text));
  });

});

server.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});
