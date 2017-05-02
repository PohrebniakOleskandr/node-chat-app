const expect = require('expect');

const {generateMessage,generateLocationMessage} = require('./message.js');

describe('generateMessage', () =>{
  it('should generate correct message object', () => {

    let from = 'Alex';
    let text = 'I wish you were here';
    let message =  generateMessage(from,text);

    expect(message).toInclude({
      from,
      text
    });
    expect(message.createdAt).toBeA('number');

  });
});

describe('generateLocationMessage', () =>{

  it('should generate correct location message object', () => {

    let from = 'Alex';
    let latitide = 1;
    let longitude = 1;
    let url = 'https://www.google.com/maps?q=1,1';

    let locationMessage =  generateLocationMessage(from,latitide,longitude);

    expect(locationMessage).toInclude({
      from,
      url
    });
    expect(locationMessage.createdAt).toBeA('number');
  });
});
