import agent from 'superagent-bluebird-promise'
import osmosis from 'osmosis'
import { 
  headers,
  STUBLR_USERNAME,
  STUBLR_PASSWORD, 
  onSaleRef } from './config'


export const loginToStublr = (username, password, headers) => {
  return new Promise((resolve, reject) => {
    osmosis
      .get('http://stublr.com/my-account/')
      .login(STUBLR_USERNAME, STUBLR_PASSWORD)
      .then((context, data, next) => {
        let {request:{headers}} = context
        resolve(headers)
      })
      .log(console.log)
      .error(err => reject(err))
  })
}

export const getLoginHeaders = () => {
  return agent
          .get('http://stublr.com')
          .then(res => res.req._headers)
          .catch(err => err)
}

export const getSalesList = (headers, pageNumber, date) => {
  let url 
  if(pageNumber === 1) {
    url = `http://stublr.com/sales-list/?sldate=${date}&sltime=0&sltype=0&slcnty=0&slcats=0&sllist=0&sls=`
  }
  else {
    url = `http://stublr.com/sales-list/page/${pageNumber}/?sldate=${date}&sltime=0&sltype=0&slmrct=0&slcnty=0&slcats=0&sllist=0`
  }
  return agent
          .get(url)
          .set(headers)
          .then(res => res.text)
          .catch(err => err)
}

export const saveEventList = (events) => {
  return Promise.all(Promise.map(events, event => {
    return onSaleRef.push(event)
  }))
}