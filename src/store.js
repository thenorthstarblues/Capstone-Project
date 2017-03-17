<<<<<<< HEAD
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      createLogger({collapsed: true}),
      thunkMiddleware,
    )
  )
)
=======
  import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/rootReducer';


import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    createLogger({collapsed:true})
  )
))


>>>>>>> master

export default store;
