import { expect } from 'chai'
import osmosis from 'osmosis'

import { 
  loginToStublr, 
  getLoginHeaders,
  getSalesList,
  saveEventList
} from './helpers'

import { 
  USERNAME, 
  PASSWORD 
} from './config'

import { parseSalesPage } from './parser'


describe('ticket on sale scraper', () => {
  let loginHeaders
  let salesListHtml
  let events
  it('should login to stublr', done => {
    loginToStublr()
    .then(headers => {
      expect(headers).to.not.be.undefined
      loginHeaders = headers
      done()
    })
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