import { 
  loginToStublr,
  getSalesList,
  saveEventList
 } from './helpers'
 import {
  parseSalesPage,
  getEventListPages
 } from './parser'
 import { signalingRef } from './config'

 // const start = () => {
 //    return loginToStublr()
 //    .then(headers => {
 //      let promises = []
 //      console.log('got headers', headers)
 //      for(var i=1; i<= 50; i++) {
 //        promises.push(getSalesList(headers, i, '0'))
 //      }
 //      return Promise.all(promises)
 //    })
 //    .map(item => {
 //      console.log(item)
 //    })
 //    .map(saveEventList)
 //    .then(() => console.log('done'))
 //    .catch(console.log)
 // }





const buildPromises = (headers, numPages, day) => {
  let dayLookup = {
    'today': '0',
    'tomorrow': '1'
  }
  let promises = []
  return new Promise((resolve, reject) => {
    for(var i=1; i<=numPages ; i++) {
      promises.push(getSalesList(headers, i, dayLookup[day]))
    }
    resolve(promises)
  })
}

const start = () => {
  let headers
  let finished1
  let finished2
  setInterval(() => {
    if(finished1 === true && finished2 === true) {
      process.exit()
    }
  })
  loginToStublr()
  .then(h => {
    headers = h
    //get page number length for onsale list today and tomorrow
    return Promise.all([
      getSalesList(headers, 1, '0').then(res => res),
      getSalesList(headers, 1, '1').then(res => res)
    ])
  })
  .map(getEventListPages)
  .then(data => {
    let pageLengthToday = data[0]
    let pageLengthTomorrow = data[1]
    let tomorrowsEvents = buildPromises(headers, pageLengthTomorrow, 'tomorrow')
    .map(parseSalesPage)
    .map(saveEventList)
    .then(() => finished1 = true)
    let todaysEvents = buildPromises(headers, pageLengthToday, 'today')
    .map(parseSalesPage)
    .map(saveEventList)
    .then(() => finished2 = true)
  })

}
//run every 5 hours
// start()
module.exports = start;