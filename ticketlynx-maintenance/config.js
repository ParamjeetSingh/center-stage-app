// import firebaseAdmin from 'firebase-admin'
// global.Promise = require('bluebird')

// const serviceAccount = require('./serviceAccount.json')

// import config from '../config'
const config = require('../config.js')

// export const firebase = firebaseAdmin.initializeApp({
//   credential: firebaseAdmin.credential.cert(serviceAccount),
//   databaseURL: "https://ticketlynx-5a17f.firebaseio.com"

// })

// export const onSaleRef = config.firebase.database().ref('testData')
export const onSaleRef = config.firebase.database().ref('onSale')
// export const onSaleRef = firebase.database().ref('onSale')
//create a firebase ref that serves as a signaling tool for the scrapers to run
export const signalingRef = config.firebase.database().ref('signalingRef')
export const reportRef = config.firebase.database().ref('reports')
export const userRef = config.firebase.database().ref('users')