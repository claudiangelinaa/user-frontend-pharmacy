import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './Reducers/authReducer'

const Store = createStore(
  combineReducers({authReducer}),
  composeWithDevTools(applyMiddleware(thunk))
);

export default Store