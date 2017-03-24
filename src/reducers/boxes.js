import axios from 'axios';
import { makeGroup, addPage, setCurrent } from './addPageReducer';
import Immutable from 'immutable';
import { SET_BOX, ADD_BOX, REMOVE_BOX, SET_PARENT, ADD_CHILD, REMOVE_PARENT, REMOVE_CHILD, COPY_BOX } from '../constants_actioncreators/boxes';
import { LOAD_LAYOUT, SAVE } from '../constants_actioncreators/layout';

const initialState = Immutable.Map({
  0: Immutable.Map({
    height: 500,
    width: 950,
    children: Immutable.List(),
    id: 0,
    x: 0,
    y: 0,
    parent: null,
    tag: 'div',
    css: '',
<<<<<<< HEAD
  }
};

const SAVE = 'SAVE'
const ADD_BOX = 'ADD_BOX'
const REMOVE_BOX = 'REMOVE_BOX'
const SET_BOX = 'SET_BOX'
const SET_PARENT = 'SET_PARENT'
const ADD_CHILD = 'ADD_CHILD'
const REMOVE_PARENT = 'REMOVE_PARENT'
const REMOVE_CHILD = 'REMOVE_CHILD'
const COPY_BOX = 'COPY_BOX'
const LOAD_LAYOUT = 'LOAD_LAYOUT'


export const setBox = (box) => {
  return {
    type: SET_BOX,
    box
  }
}

export const addBox = (id, tag) => {
  return {
    type: ADD_BOX,
    box: {
      id: +id,
      x: 960,
      y: 150,
      width: 100,
      height: 50,
      children: [],
      parent: null,
      tag: tag,
      css: 'p10 ',
    }
  }
}

export const removeBox = (boxId) => {
  return {
    type: REMOVE_BOX,
    boxId,
  }
}

export const setParent = (parentId, childId) => {
  return {
    type: SET_PARENT,
    parentId,
    childId
  }
}

export const addChild = (parentId, childId) => {
  return {
    type: ADD_CHILD,
    parentId,
    childId
  }
}

export const removeParent = (childId) => {
  return {
    type: REMOVE_PARENT,
    childId
  }
}

export const removeChild = (parentId, childId) => {
  return {
    type: REMOVE_CHILD,
    parentId,
    childId
  }
}

export const copyBox = (boxId, newBoxId) => {
  return {
    type: COPY_BOX,
    boxId,
    newBoxId,
  }
}

export const load = (newLayout) =>{
  return {
    type: LOAD_LAYOUT,
    newLayout, //TODO: make this dispatch to load
  }
}
=======
  }),
});
>>>>>>> de1b512020657b966c360119118738229497bdd5


const boxesReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SET_BOX:
      return prevState.set(action.box.id, Immutable.fromJS(action.box));
    case ADD_BOX:
      return prevState.set(action.box.id, Immutable.fromJS(action.box));
    case REMOVE_BOX:
      return prevState.delete(action.boxId);
    case SET_PARENT:
      return prevState.setIn([action.childId, 'parent'], action.parentId);
    case ADD_CHILD:
      return prevState.updateIn([action.parentId, 'children'], (childMap) => {
        return childMap.push(action.childId);
      });
    case REMOVE_PARENT:
      return prevState.setIn([action.childId, 'parent'], null);
    case REMOVE_CHILD:
      return prevState.updateIn([action.parentId, 'children'], (childMap) => {
        return childMap.filter(child => child !== action.childId);
      });
    case COPY_BOX:
      const newBox = prevState.get(action.boxId).withMutations((oldBox) => {
        oldBox
          .set('id', action.newBoxId)
          .set('x', 960)
          .set('y', 100)
          .set('children', Immutable.List())
          .set('parent', null);
      });
      return prevState.set(action.newBoxId, newBox);
    case LOAD_LAYOUT:
      return prevState.clear().merge(action.newLayout);
    case SAVE:
      return prevState;
    default:
      return prevState;
  }
};

export default boxesReducer;

<<<<<<< HEAD
export const loadLayout = (id) => {
  return (dispatch) => {
    axios.get(`api/elements/layout/${id}`)
  .then((elements)=> {
    const data = elements.data;
    let newState = {}
    data.forEach((element)=>{
      const id = element.layId;
      delete element.layId;
      delete element.createdAt;
      delete element.updatedAt;
      delete element.layoutId;
      element.id = id;
      newState[id] = element;
      let children = [];
      if(element.children) {children = [...element.children.split(',')]}
      const childrenArr = children.map(val=>{
        return +val;
      })
      element.children= childrenArr;
    })
    dispatch(load(newState))
  })}
}

export const saveLayout = (name, stateCopy) => {
  return (dispatch) => {
  axios.post('api/layouts', {
    name: name,
    author: name,
    })
    .then((layout)=> {
      const id = layout.data.id
      const makeelements =[]; //converting to array
      const elemClone = Object.assign({},stateCopy);
      const elementIdArr = Object.keys(elemClone);
      for (var i = 0; i <elementIdArr.length; i++){
        const elem = elemClone[i];
        const layId = elem.id;
        elem.children = elem.children.join(',')
        delete elem.id;
        const newElement = Object.assign({}, elem, {layId: layId, layoutId:id})
        makeelements.push(axios.post('/api/elements', newElement))
      }

      Promise.all(makeelements).then((result)=>{

      dispatch(loadLayout(id))

      })
    } )
  }
}
=======
>>>>>>> de1b512020657b966c360119118738229497bdd5
