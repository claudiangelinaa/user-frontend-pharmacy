import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'remote-redux-devtools';

import authReducer from './Reducers/authReducer'

const Store = createStore(
  combineReducers({authReducer}),
  applyMiddleware(thunk)
);

export default Store