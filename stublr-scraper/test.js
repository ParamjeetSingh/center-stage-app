import { expect } from 'chai'
import osmosis from 'osmosis'

import { 
  loginToStublr, 
  getLoginHeaders,
  getSalesList,
  saveEventList
} from './helpers'

import { 
  STUBLR_USERNAME, 
  STUBLR_PASSWORD 
} from './config'

import { parseSalesPage } from './parser'


describe('stublr scraper', () => {
  let loginHeaders
  let salesListHtml
  let events
  it('should login to stublr', done => {
    osmosis
      .get('http://stublr.com/my-account/')
      .login(STUBLR_USERNAME, STUBLR_PASSWORD)
      .then((context, data, next) => {
        let {request:{headers}} = context
        expect(headers).to.not.be.undefined
        loginHeaders = headers
        done()
      })
      .log(console.log)
      .error(console.log)
  })
  it('should get on sale list', done => {
    getSalesList(loginHeaders)
    .then(html => {
      expect(html).to.be.ok
      salesListHtml = html
      done()
    })
  })
  it('should parse on sales list', done => {
    expect(salesListHtml).to.not.be.undefined
    parseSalesPage(salesListHtml)
    .then(res => {
      expect(res).to.be.an('array')
      console.log(res)
      events = res
      done()
    })
  })
  it('should save list in firebase', done => {
    saveEventList(events)
    .then(res => {
      done()
    })
  })

})