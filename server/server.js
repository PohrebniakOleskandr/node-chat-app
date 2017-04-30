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

  socket.on('disconnect', () =>{
    console.log('Client has disconnected from server via socket...');
  });

});

server.listen(port, ()=> {
  console.log(`Server started on port ${port}`);
});
