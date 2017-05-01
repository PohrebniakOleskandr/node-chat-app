let socket = io();

socket.on('connect', function(){
    console.log('A new connection to server is started');
});

socket.on('disconnect', function(){
  console.log('Server is down');
});

socket.on('newMessage', function(message){
  // console.log('A new message:');
  // console.log(message);
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

// socket.emit('createMessage',
//   {
//     from:'Евгений Членко',
//     text:'Мусорам по пасти...'
//   },
//   function(data){
//     console.log('===');
//     console.log(data);
//     console.log('===');
//   }
// );


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage',
    {
      from:'User',
      text: jQuery('[name=message]').val()
    },
    function(data){
      // console.log('===');
      // console.log(data);
      // console.log('===');
    }
  );
});
