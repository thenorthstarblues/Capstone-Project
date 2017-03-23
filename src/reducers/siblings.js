import Immutable from 'immutable';
import { columnRowCheck } from './divRecognition';
import { formatCheck } from './cssRecognition';
import { htmlCreator, createCss } from './html';


const initialState = Immutable.Map();

export const SIB_RECOG = 'SIB_RECOG';

const setSiblings = boxObjs => ({
  type: SIB_RECOG,
  boxesCss: boxObjs,
});

export const findSiblings = boxes => (dispatch) => {
  const boxObjs = Object.assign({}, boxes); //clone and begin manipulation
  let len = Object.keys(boxObjs);

  //check and group in new divs
  for (let i = 0; i < len.length; i++) {
    if (boxObjs[len[i]]){ //originals are numbers, so will only iterate through original boxes
      columnRowCheck(boxObjs, len[i], boxObjs[len[i]].children);
    }
  }
  len = Object.keys(boxObjs);
  len.forEach((box) => {
    formatCheck(boxObjs, box);
  });
  //setSiblings, but also create html & css;
  dispatch(setSiblings(boxObjs));
  dispatch(htmlCreator(boxObjs));
  dispatch(createCss()); // what goes in here, Ray ?
};

//---------------------------action reducer---------------------------
const siblingReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SIB_RECOG:
      return Immutable.fromJS(action.boxesCss);
    default:
      return prevState;
  }
};

export default siblingReducer;

