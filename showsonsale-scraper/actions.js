import * as C from './constants'

export const requestHeadersChanged = newHeaders => dispatch => {
  return Promise.resolve(dispatch({
    type: C.REQUEST_HEADERS_CHANGED,
    headers: newHeaders
  }))
}
export const responseHeadersChanged = newHeaders => dispatch => {
  return Promise.resolve(dispatch({
    type: C.RESPONSE_HEADERS_CHANGED,
    headers: newHeaders
  }))
}




