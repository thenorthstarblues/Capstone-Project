import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers/rootReducer';


import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed:true})
  )
);

export default store;
