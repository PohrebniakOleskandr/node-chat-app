
let socket = io();

/*Срабатывает на io()*/
socket.on('connect', function(){

    let params = jQuery.deparam(window.location.search);
    socket.emit('join', params, (err) =>{
      if(err){
        alert(err);
        window.location.href = '/';
      }
      else {
        console.log('No error');
      }
    });

});

/*Если сервер разорвал соединение*/
socket.on('disconnect', function(){
  console.log('Server is down');
});



socket.on('updateUserList', (users)=> {
  console.log(users);

  let ul = jQuery('<ul></ul>');

  users.forEach((user)=>{
    ul.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ul);
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
  scrollToBottom()
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
  scrollToBottom()
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


function scrollToBottom(){

  //selectors
  let messages = jQuery('#messages');
  let newMessage = messages.children('li:last-child');
  //metrics
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');

  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let scrollBottom = scrollHeight - (clientHeight+scrollTop);

  if (scrollBottom==0) return;
  if(scrollBottom>0 && scrollBottom <= newMessageHeight + newMessage.prev().innerHeight())
    messages.scrollTop(scrollHeight);
}
