const config = require('../config.js')

// import firebaseAdmin from 'firebase-admin'
// global.Promise = require('bluebird')

export const USERNAME = 'info520'
export const PASSWORD = 'Jon11'


export let headers = {
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'en-US,en;q=0.8,sv;q=0.6',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Referer': 'http://www.showsonsale.com/',
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Cookie': 'ASP.NET_SessionId=tvdvph2seak3uhsozjxdmuoa; loginCustName=info520; lastlogout=6/9/2017 1:17:50 PM; gsScrollPos-684=0; gsScrollPos-682=69; gsScrollPos-691=1; signname=info520; .vsolcookie2=CF62A586E7D2B62326A891A2FC5D0CFF13E999664774798C151089079A0A03F852EFD1165647C2A54073FF57FF6A3C946CCAC08EE7F070722AB1B3C14D5F0B072FB4EE18C57E79E07797F48DD055D05231F75C7BFCF32552DBA90748B68D6DA036DCFAD88E9D2A0FEAEC7FE9527DF11A8561F5F81FFE7707082909CB2C269DB42A41BA1B29483FBA0253F449ECDD3E59'
};

// export const firebase = firebaseAdmin.initializeApp({
//     credential: firebaseAdmin.credential.cert(serviceAccount),
//     databaseURL: "https://ticketlynx-5a17f.firebaseio.com"
// })



// export const onSaleRef = config.firebase.database().ref('testData')
export const onSaleRef = config.firebase.database().ref('onSale')

// export const baseURL = 'http://www.showsonsale.com'

// export const loginCredentials = {
//   username: 'info520',
//   password: 'Jon11'
// }


