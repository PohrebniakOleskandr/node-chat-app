let socket = io();

/*Срабатывает на io()*/
socket.on('connect', function(){
    console.log('A new connection to server is started');
});

/*Если сервер разорвал соединение*/
socket.on('disconnect', function(){
  console.log('Server is down');
});


/*Если сервер оповестил о новом сообщении*/
socket.on('newMessage', function(message){
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});


/*Если сервер оповестил о новом гео-сообщении*/
socket.on('newLocationMessage', function(message){
  let li = jQuery('<li></li>');
  let a = jQuery('<a target="_blank">My current location</a>');

  a.attr('href', message.url);
  li.text(`${message.from}: `);

  li.append(a);
  jQuery('#messages').append(li);
});


/*При нажатии кнопки отправить*/
jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage',
    {
      from:'User',
      text: jQuery('[name=message]').val()
    },
    function(data){
    }
  );
});

let locationButton = jQuery('#send-location');
/*При нажатии локационной кнопки*/
locationButton.on('click', ()=> {
  if(!navigator.geolocation){
    return alert('Geolocation is not supported in current version of browser');
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
        socket.emit('createLocationMessage',{
          latitude : position.coords.latitude,
          longitude : position.coords.longitude
        });
    },
    () => alert('Unable to fetch location')
  );

});
