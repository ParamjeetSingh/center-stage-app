import {
    loginToShowsOnSale,
    getSalesList,
    saveEventList,
} from './helpers.js'
import { parsePresalePage } from './parser'
import { signalingRef } from './config'

const start = () => {
    return loginToShowsOnSale()
        .then(getSalesList)
        .then(parsePresalePage)
        .then(saveEventList)
        .catch(console.log)
}

//run every 5 hours
// start()
module.exports = start;