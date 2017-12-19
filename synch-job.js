var asyncProcess = require('async');
var ticketlynxMaintenance = require('./ticketlynx-maintenance');
var showsonsaleScraper = require('./showsonsale-scraper');
var stublrScraper = require('./stublr-scraper');
var ticketonsaleScraper = require('./ticketonsale-scraper');

const startJob = () =>  {
  console.log('pre-run');
  return asyncProcess.waterfall([
    function(callback){
      console.log('ticketlynxMaintenance');
      console.log(ticketlynxMaintenance);
      ticketlynxMaintenance.removeOnSaleRef()
        .then((res)=>{
          console.log('ticketlynxMaintenance run successfully',);
          callback( null, res); 
        }).catch((error)=>{
          callback( error, 'data callback');
        })
    },
    function(data, callback){
      console.log('showsonsaleScraper');
      console.log(showsonsaleScraper);
      showsonsaleScraper.start()
        .then((res)=>{
          console.log('showsonsaleScraper Run Succesfully');
          callback( null, res); 
        }).catch((error)=>{
          callback( error, 'data callback');
        })
    },
    function( data, callback){
      console.log('stublrScraper');
      console.log(stublrScraper);
      stublrScraper.start()
        .then((res)=>{
          console.log('stublrScraper Run Succesfully');
          callback( null, res); 
        }).catch((error)=>{
          callback( error, 'data callback');
        })  
    },
    function( data, callback){
      console.log('ticketonsaleScraper');
      console.log(ticketonsaleScraper);
      ticketonsaleScraper.start()
        .then((res)=>{
          console.log('ticketonsaleScraper Run Succesfully');
          callback( null, res); 
        }).catch((error)=>{
          callback( error, 'data callback');
        })   
    }
    ],function(err,result){
      if (err){
        console.log(err);
      }
    });
};

module.exports = startJob;