//testingOnly folder for some fake initial data;
import {dummyData0, dummyData1} from './dummyLayoutData.js';


export const SIB_RECOG = 'SIB_RECOG';

//---------------------------action creator---------------------------

export const findSiblings = (objects => { // one giant object, with each id-object as held

  const boxObjs=Object.assign({}, objects); //clone and begin manipulation

  //add function below and include here...

	//the magic happens here!

  return {
    type: SIB_RECOG,
    objects:boxes,
  }

});


//-----------------------initial state ...stuffing state------------

const initialState = dummyData0; // just for initial testing

//---------------------------action reducer---------------------------

const siblingReducer = (prevState = initialState, action) => {
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

//for each obj, run this on its children

//a:{children:[]}

function sibCheck(object, children){

  if (children.length<2){ // 1 child, like an image or something... but nothing to be reordered
    //do nothing
    break;
  }

  if (children.length>=2){
    // [b,c,d,e]
    /* for each, pop from array and see whether: b dimension , then check some [c,d,e]
      check some - remaining objects align in column ... make those objects their own array */
    function withinC(child){
      return (child.x === comp.x && (child.x + child.width)===(comp.x + comp.width));
    }

    function withoutC(child){
      return !withinC(child);
    }

    function withinR(child){
      return (child.y === comp.y && (child.y + child.height)===(comp.y + comp.height));
    }

    function withoutR(child){
      return !withinR(child);
    }

    var comp = children.shift();

    var col = children.filter(withinC); // any fit as columns ? if so return in array
    children = children.filter(withoutC); //copy those that don't fit in column

    if (col){
      col.push(comp);
      //reset parent and child attributes w/ new div.
      //col are the column-children

    };

    comp = children.shift();

    var row = children.filter(withinR); // any fit as columns ? if so return in array
    children = children.filter(withoutR); //copy those that don't fit in either set

    if (row){
      row.push(comp);
      //reset parent and child attributes w/ new div.
      //col are the column-children

    };
    /*for those objects that that don't match
    new check some -

    */

  }


}

