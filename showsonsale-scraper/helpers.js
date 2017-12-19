import agent from 'superagent-bluebird-promise'
import osmosis from 'osmosis'
import fs from 'fs'
import {
    headers,
    USERNAME,
    PASSWORD,
    onSaleRef 
} from './config'

export const loginToShowsOnSale = (username, password, headers) => {
    return new Promise((resolve, reject) => {
        osmosis  
            .post('https://www.showsonsale.com/login.aspx')
            .login('info520','Jon11')
            .then((context, data, next) => {
                let {request:{headers}} = context
                resolve(headers)
            })
            .log(console.log)
            .error(err => reject(err))
    })
}

export const getSalesList = (headers, pageNumbers, date) => {
    return agent
        .get('https://www.showsonsale.com/memberhome.aspx')
        .set(headers)
        .then(res =>  res.text )
        .catch(err => console.log(err))
}

export const saveEventList = events => {
    return Promise.all(Promise.map(events, event => {
        onSaleRef.push(event, () => Promise.resolve())
    }))
}