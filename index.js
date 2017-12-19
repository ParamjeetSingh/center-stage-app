require('babel-register')
require('./config')
var cron = require('node-cron');
var startJob = require('./synch-job');


// JUT NOw
 startJob();

//After Every 5 hours
let task = cron.schedule('* * */5 * *', function(){
  startJob();
});
task.start();