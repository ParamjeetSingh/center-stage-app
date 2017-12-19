import * as C from './constants'

export const requestHeaders = (state={}, action) => {
  switch(action.type) {
    case C.REQUEST_HEADERS_CHANGED:
      return action.headers
    default:
      return state
  }
}
export const responseHeaders = (state={}, action) => {
  switch(action.type) {
    case C.RESPONSE_HEADERS_CHANGED:
      return action.headers
    default:
      return state
  }
}