//testingOnly folder for some fake initial data;
import {initState0, initState1} from './testingOnly/dummyLayoutData.js';


export const SIB_RECOG = 'SIB_RECOG';

//---------------------------action creator---------------------------

export const findSiblings = (objects => { // one giant object, with each id-object as held

  const boxes=Object.assign( {}, objects); //clone and begin manipulation

	//the magic happens here!



  return {
    type: SIB_RECOG,
    objects:boxes,
  }

});

//-----------------------initial state ...stuffing state------------

//see above. . .

//---------------------------action reducer---------------------------

const siblingReducer = (prevState = {}, action) => {
  let nextState = Object.assign({}, prevState);

  switch(action.type) {
    case SIB_RECOG:
      nextState.boxes = action.boxes;
      break;

    default:
      return prevState;
  }
  return nextState;
}

export default siblingReducer;

