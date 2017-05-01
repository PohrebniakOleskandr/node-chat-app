let socket = io();

socket.on('connect', function(){
    console.log('User is connected to server via socket...');
});

socket.on('disconnect', function(){
  сonsole.log('User is disconnected to server via socket...');
});

socket.on('newMessage', function(message){
  console.log(message);
});
