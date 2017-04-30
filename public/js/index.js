let socket = io();

socket.on('connect', function(){
    console.log('User is connected to server via socket...');

    socket.emit('createMessage',{
      to:'Катя',
      text:'Эгегей, Ара!'
    });
});

socket.on('disconnect', function(){
  onsole.log('User is disconnected to server via socket...');
});


socket.on('newMessageEvent', function(message){
  console.log('From:',message.from);
  console.log('At:',message.createAt);
  console.log(message.text);
});
