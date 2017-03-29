import Immutable from 'immutable';
import { columnRowCheck } from './divRecognition';
import { formatCheck, cleanCss } from './cssRecognition';
import { htmlCreator, createCss, htmlCreatorPreview } from './html';


export const initialState = Immutable.Map({ });

export const SIB_RECOG = 'SIB_RECOG';

const setSiblings = boxObjs => ({
  type: SIB_RECOG,
  boxesCss: boxObjs,
});

const boxRecog = (boxes => {
  const boxObjs = Object.assign({}, boxes);
  //console.log('sib', boxObjs);
  parentGuar(boxObjs);

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

  return boxObjs;
});

export const findSiblings = boxes => (dispatch) => {
  let boxObj=boxRecog(boxes);

  dispatch(setSiblings(boxObj));
  dispatch(htmlCreator(boxObj));
  dispatch(createCss(boxObj));
};

export const previewSiblings = boxes => (dispatch) => {
  let boxObj=boxRecog(boxes);

  dispatch(setSiblings(boxObj));
};

export const previewLive = boxes => (dispatch) => { //so everything is in store
  let boxObj=boxRecog(boxes);

  dispatch(setSiblings(boxObj));
  dispatch(htmlCreator(boxObj));
  dispatch(createCss(boxObj));
  dispatch(htmlCreatorPreview(boxObj));

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


//catch function

  //const boxObjs = Object.assign({}, boxes);
  //boxObjs...look thru all entries, find those with '0' as parent and make an array
  //set boxObjs[0].children = that array

function parentGuar(boxObjs){
  const zer=[];

  for (let item in boxObjs){
    if (boxObjs[item].parent===0 || boxObjs[item].parent==='0'){
      zer.push( +item);
    }
  }

  boxObjs[0].children=zer;

}
