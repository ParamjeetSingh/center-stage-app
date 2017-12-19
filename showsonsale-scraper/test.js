import {expect} from 'chai'
import { 
  getUrl
} from './helpers'
import { showsOnSaleLogin, headers } from './config'
import { getViewState, getViewStateGenerator } from './parser'
import { buildParams, buildUrl } from './utils'
import { store } from './store'
import { requestHeadersChanged, responseHeadersChanged } from './actions'
//import { store } from './store'


describe.only('store', () => {
  it('should initialize store', done => {
    const { dispatch, getState } = store
    expect(dispatch).to.not.be.undefined
    expect(getState).to.not.be.undefined
    expect(requestHeadersChanged).to.not.be.undefined
    expect(responseHeadersChanged).to.not.be.undefined
    done()
  })
  it('should update request headers in store', done => {
    const {dispatch, getState} = store
    let headers = {
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'en-US,en;q=0.8,sv;q=0.6',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Referer': 'http://www.showsonsale.com/',
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Cookie': 'ASP.NET_SessionId=t52pqvdtxnbutv4g3wwiakjk; loginCustName=info520; lastlogout=6/13/2017 9:28:16 AM; signname=info520; .vsolcookie2=6A0F39C526F4652D9B23B2EC0D96F6D1B5F0117F0416CBB15B824A592AEEA4124C387552C62DCEED9552A75D4F2A85082560545BA013F4AFE0D6AEA723F9A74CB693454042A3DD8FAA19B862B64914B215B172ADDD5A4BB021C5BB0275C57F30A88B86400FA7C171B919C3E751522A6A5F7FF97C4F3B2C61A583D615B07F19FE775EED42B51A8123209791D8A8C60DC1'
  }
  dispatch(requestHeadersChanged(headers))
  .then(newHeaders => {
    expect(newHeaders).to.not.be.undefined
    expect(getState().requestHeaders).to.not.be.undefined
    done()
    }) 

  })
  it('should update response headers in store', done => {
    const {dispatch, getState} = store
    let headers = {
      'Accept-Encoding': 'gzip, deflate, sdch',
      'Accept-Language': 'en-US,en;q=0.8,sv;q=0.6',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Referer': 'http://www.showsonsale.com/',
      'Connection': 'keep-alive',
      'Cache-Control': 'max-age=0',
      'Cookie': 'ASP.NET_SessionId=t52pqvdtxnbutv4g3wwiakjk; loginCustName=info520; lastlogout=6/13/2017 9:28:16 AM; signname=info520; .vsolcookie2=6A0F39C526F4652D9B23B2EC0D96F6D1B5F0117F0416CBB15B824A592AEEA4124C387552C62DCEED9552A75D4F2A85082560545BA013F4AFE0D6AEA723F9A74CB693454042A3DD8FAA19B862B64914B215B172ADDD5A4BB021C5BB0275C57F30A88B86400FA7C171B919C3E751522A6A5F7FF97C4F3B2C61A583D615B07F19FE775EED42B51A8123209791D8A8C60DC1'
    }
     dispatch(responseHeadersChanged(headers))
      .then(newHeaders => {
        console.log('got new response headers', newHeaders)
        expect(newHeaders).to.not.be.undefined
        expect(getState().responseHeaders).to.not.be.undefined
        done()
    })

  })
})

describe.only('utils', () => {
  it('should build url without params', done => {
    let originalUrl = 'http://google.com'
    let url = buildUrl(originalUrl, null)
    console.log('built', url)
    expect(url).to.eq(originalUrl)
    done()
  })
  it('should build url with params', done => {
    let originalUrl = 'http://google.com'
    let params = [{username:'hey'}, {password:'yoo'}]
    let paramString = buildParams(params)
    let url = buildUrl(originalUrl, paramString)
    console.log('built', url)
    expect(url).to.eq('http://google.com?username=hey&password=yoo')
    done()
  })
})

// describe.only('superagent test', () => {
//   it('should get http://www.showsonsale.com', done => {
//     return getUrl('http://www.showsonsale.com', )
//   })

// })
describe.only('showsonsale', () => {
  
  it('should get home page', done => {
    const {dispatch, getState} = store
    dispatch(getUrl('https://showsonsale.com'))
    .then(() => {
      console.log(getState())
    })
  })
  // it('should find csrf token', done => {
  //   getViewState(response)
  //   .then(t => {
  //     expect(t).to.not.be.undefined
  //     token = t
  //     expect(token).to.not.be.undefined
  //     console.log(token)
  //     done()
  //   })
  // })
  // it('should find viewStateGenerator', done => {
  //   getViewStateGenerator(response)
  //   .then(v => {
  //     expect(v).to.not.be.undefined
  //     console.log(v)
  //     viewStateGenerator = v
  //     expect(viewStateGenerator).to.not.be.undefined
  //     done()
  //   })
  // })
  // it('should have headers, response text, token and viewstate generator', done => {
  //   expect(headers).to.not.be.undefined
  //   expect(token).to.not.be.undefined
  //   expect(viewStateGenerator).to.not.be.undefined
  //   expect(response).to.not.be.undefined
  //   expect(response).to.be.a.string
  //   done()
  // })
  // it('should build params', done => {
  //   let arrayOfObjects = [{name:'hello'},{currency:'yooo'}, {test:'hello world'}]
  //   let paramString = buildParams(arrayOfObjects)
  //   console.log(paramString)
  //   expect(paramString).to.not.be.undefined
  //   done()
  // })
  //it('should do a post back', done => {

  //})

  // it('should get blank viewstate using viewStateGenerator and csrf token and headers', done => {
  //   console.log('headers are', headers)
  //   getBlankViewState(token, viewStateGenerator, headers)
  //   .then(res => {
  //     getViewState(res.text)
  //     .then(state => {
  //       console.log('new view state is', state)
  //     })
  //     expect(res).to.not.be.undefined
  //     console.log('request headers', res.req._headers)
  //     console.log('response headers', res.headers)
  //     expect(res.req._headers).to.not.be.undefined
  //     expect(res.headers).to.not.be.undefined
  //     requestHeaders = res.req._headers
  //     expect(requestHeaders).to.not.be.undefined
  //     let {cookie} = requestHeaders
  //     expect(cookie).to.not.be.undefined
  //     done()
  //   })
  // })
  // it('should get default page', done => {
  //   getDefaultPage(requestHeaders)
  //   .then(res => {
  //     console.log('request headers', res.req._headers)
  //     console.log('response headers', res.headers)
  //     requestHeaders = res.req._headers
  //     getViewState(res.text)
  //     .then(state => {
  //       console.log('new view state is', state)
  //     })
  //     done()
  //   })
  // })
  // it('should get member page', done => {
  //   getMainPage(requestHeaders)
  //   .then(res => {
  //     console.log(res.text)
  //     done()
  //   })
  // })
  
})