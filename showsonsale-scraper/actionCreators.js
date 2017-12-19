import * as C from './constants'
import mongoose from 'mongoose'

export const headersChanged = newHeaders => dispatch => {
  return new Promise((resolve, reject) => {
    return mongoose
            .model('headers')
            .updateHeaders(newHeaders)
            .then(res => res)
  })
}