let moment = require('moment');

const generateMessage = (from,text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

const generateLocationMessage = (from,latitide,longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitide},${longitude}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage,generateLocationMessage};
