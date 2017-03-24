import Immutable from 'immutable';
import { columnRowCheck } from './divRecognition';
import { formatCheck, cleanCss } from './cssRecognition';
import { htmlCreator, createCss } from './html';


const initialState = Immutable.Map();

export const SIB_RECOG = 'SIB_RECOG';

const setSiblings = boxObjs => ({
  type: SIB_RECOG,
  boxesCss: boxObjs,
});

export const findSiblings = boxes => (dispatch) => {
  const boxObjs = Object.assign({}, boxes);
  let len = Object.keys(boxObjs);
  for (let i = 0; i < len.length; i++) {
    if (boxObjs[len[i]]) {
      columnRowCheck(boxObjs, len[i], boxObjs[len[i]].children);
    }
  }
  len = Object.keys(boxObjs);
  len.forEach((box) => {
    formatCheck(boxObjs, box);
  });

  len.forEach((box) => {
    cleanCss(boxObjs, box);
  });
  dispatch(setSiblings(boxObjs));
  dispatch(htmlCreator(boxObjs));
  dispatch(createCss(boxObjs));
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

