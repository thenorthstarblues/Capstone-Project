import {combineReducers} from 'redux';
//for when/if we add more combineReducers do it here

const initialState = {
  main: {}
};
//dont forget to set state types!


const testFunc = (payload) => {
  type: 'test',
  payload
}
const rootReducer = (state= initialState, action) => {

  const newState = Object.assign({}, state);

  switch(action.type){
    case 'test':
     newState.main = action.payload;
       break;

    default:
      return state;
  }

  return newState;
}

export const dispatchTest = (payload) => {
  return dispatch => {dispatch(testFunc(payload))};
};


//  const rootReducer = combineReducers({
//   main: reducer,
// });

export default rootReducer;
