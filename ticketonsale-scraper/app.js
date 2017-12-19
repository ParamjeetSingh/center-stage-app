import { 
  loginToTicketOnSale,
  getSalesList,
  saveEventList
 } from './helpers'
 import {
  parseSalesPage
 } from './parser'
 import { signalingRef } from './config'

 const start = () => {
  return loginToTicketOnSale()
  .then(getSalesList)
  .then(parseSalesPage)
  .then(saveEventList)
  .catch(console.log)
 }

//run every 5 hours
//setInterval(() => start(), 18000000)
// start()
module.exports = start;