const expect = require('expect');

const {generateMessage} = require('./message.js');

describe('generateMessage', () =>{
  it('should generate correct message object', () => {

    let from = 'Alex';
    let text = 'I wish you were here';
    let message =  generateMessage(from,text);

    // expect(message.from).toBe(text);
    // expect(message.text).toBe(from);
    expect(message).toInclude({
      from,
      text
    });
    expect(message.createdAt).toBeA('number');

  });
});
