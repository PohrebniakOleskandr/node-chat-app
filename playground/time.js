let moment = require('moment');

let time = moment();
time.subtract(5, 'hours');

console.log(time.format('h:mm a'));
