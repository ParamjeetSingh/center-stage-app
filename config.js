// import firebaseAdmin from 'firebase-admin'
const firebaseAdmin = require("firebase-admin");
global.Promise = require('bluebird')

const serviceAccount = require('./showsonsale-scraper/serviceAccount.json')

export const firebase = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: "https://ticketlynx-5a17f.firebaseio.com"

})

// module.exports = firebase