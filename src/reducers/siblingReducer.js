import { columnRowCheck, css, divCreation } from './divRecognition.js';
import { formatCheck, cleanCss } from './cssRecognition.js';

import { htmlCreator, createCss } from './html';

//REDUCERS AT TOP, support functions imported

export const SIB_RECOG = 'SIB_RECOG';

const setSiblings = (boxObjs => { //simplified action creator...
    return {
    type: SIB_RECOG,
    boxesCss:boxObjs,
  }
})

//this holds the recursive bit:
export const findSiblings = (boxes => { // one giant object, with each id-object as held

  return dispatch => {
      const boxObjs=Object.assign({}, boxes); //clone and begin manipulation
      var len=Object.keys(boxObjs);

      //check and group in new divs
        for (let i=0; i<len.length; i++){
            if (boxObjs[len[i]]){ //originals are numbers, so will only iterate through original boxes
                columnRowCheck(boxObjs, len[i], boxObjs[len[i]].children);
            }
        }

      len=Object.keys(boxObjs);

        len.forEach((box)=>{
            formatCheck(boxObjs, box);
        });

        len.forEach((box)=>{
            cleanCss(boxObjs, box);
        });

      //setSiblings, but also create html & css;
      dispatch(setSiblings(boxObjs));
      dispatch(htmlCreator(boxObjs));
      dispatch(createCss(boxObjs)); // what goes in here, Ray ?
   };

});


//---------------------------action reducer---------------------------

const siblingReducer = (prevState = {}, action) => {
  let nextState = Object.assign({}, prevState);

  switch(action.type) {
    case SIB_RECOG:
      nextState = action.boxesCss;
      break;

    default:
      return prevState;
  }
  return nextState;
}

export default siblingReducer;

