import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import {
  requestHeaders,
  responseHeaders
} from './reducers'

export const store = createStore(combineReducers({
  requestHeaders,
  responseHeaders
}), applyMiddleware(thunk));