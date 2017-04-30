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
  console.log('A new client connected to server via socket...');

  socket.emit('newMessageEvent',{
    from: 'Погребняк',
    text: 'Встретимся в 6?',
    createAt: 123456
  });

  socket.on('disconnect', () =>{
    console.log('Client has disconnected from server via socket...');
  });

  socket.on('createMessage', (message) =>{
    console.log('To:',message.to);
    console.log(message.text);
  });


});

server.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});
