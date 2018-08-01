var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());

var date = moment();
date.add(1, 'week');
date.subtract(1, 'year');

console.log(date.format('MMM Do, YYYY'));

var time = moment();
console.log(time.format('h:mm a'));

var time2 = moment(1424820392132);
console.log(time2.format('YYYY MMM D H:mm'));

var timestamp = moment().valueOf(); //equal to new Date().getTime()
console.log(timestamp);