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

  let formattedTime = moment(message.createdAt).format('H:mm');
  let template = jQuery('#message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});


/*Если сервер оповестил о новом гео-сообщении*/
socket.on('newLocationMessage', function(message){

  let formattedTime = moment(message.createdAt).format('H:mm');
  let template = jQuery('#location-message-template').html();
  let html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    url: message.url
  });

  jQuery('#messages').append(html);
});


/*При нажатии кнопки отправить*/
jQuery('#message-form').on('submit', function(e) {

  e.preventDefault();

  let messageTextBox = jQuery('[name=message]');
  if(messageTextBox.val()=='') return;
  
  socket.emit('createMessage',
    {
      from:'User',
      text: messageTextBox.val()
    },
    function(data){
      messageTextBox.val('');
    }
  );
});

let locationButton = jQuery('#send-location');
/*При нажатии локационной кнопки*/
locationButton.on('click', ()=> {
  if(!navigator.geolocation){
    return alert('Geolocation is not supported in current version of browser');
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(
      (position) => {
          locationButton.removeAttr('disabled','disabled').text('Send location');
          socket.emit('createLocationMessage',{
            latitude : position.coords.latitude,
            longitude : position.coords.longitude
          });
      },() => {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled','disabled').text('Send ocation...');
    }
  );

});
