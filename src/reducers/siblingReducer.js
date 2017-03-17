//testingOnly folder for some fake initial data;
import {dummyData0, dummyData1} from './dummyLayoutData.js';


export const SIB_RECOG = 'SIB_RECOG';
export const PARENT_RECOG = 'PARENT_RECOG';

//---------------------------action creator---------------------------

export const findSiblings = (objects => { // one giant object, with each id-object as held

  const boxes=Object.assign( {}, objects); //clone and begin manipulation

	//the magic happens here!



  return {
    type: SIB_RECOG,
    objects:boxes,
  }

});

export const findParents = (objects => { // one giant object, with each id-object as held

  const boxes=Object.assign( {}, objects); //clone and begin manipulation

  //the magic happens here!



  return {
    type: PARENT_RECOG,
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

    case PARENT_RECOG:
      nextState.boxes = action.boxes;
      break;

    default:
      return prevState;
  }
  return nextState;
}

export default siblingReducer;

