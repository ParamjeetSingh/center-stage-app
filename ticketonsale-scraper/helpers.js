import agent from 'superagent-bluebird-promise'
import osmosis from 'osmosis'
import { 
  headers, 
  onSaleRef,
  USERNAME,
  PASSWORD
} from './config'


export const loginToTicketOnSale = (username, password, headers) => {
  return new Promise((resolve, reject) => {
    osmosis
      .get('http://www.ticketonsalelist.com/')
      .login(USERNAME, PASSWORD)
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

export const getSalesList = (headers) => {
  return agent
          .get('http://www.ticketonsalelist.com/presale-list')
          .set(headers)
          .then(res => res.text)
          .catch(err => err)
}

export const saveEventList = (events) => {
  return Promise.all(Promise.map(events, event => {
    return onSaleRef.push(event)
  }))
}