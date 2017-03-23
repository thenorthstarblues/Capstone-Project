import axios from 'axios';
import { Map, fromJS } from 'immutable';

const initialState = Map({
  0: Map({
    height: 500,
    width: 950,
    children: Map(),
    id: 0,
    x: 0,
    y: 0,
    parent: null,
    tag: 'div',
    css: '',
  }),
});

const SAVE = 'SAVE';
const ADD_BOX = 'ADD_BOX';
const REMOVE_BOX = 'REMOVE_BOX';
const SET_BOX = 'SET_BOX';
const SET_PARENT = 'SET_PARENT';
const ADD_CHILD = 'ADD_CHILD';
const REMOVE_PARENT = 'REMOVE_PARENT';
const REMOVE_CHILD = 'REMOVE_CHILD';
const COPY_BOX = 'COPY_BOX';
const LOAD_LAYOUT = 'LOAD_LAYOUT';


export const setBox = box => ({
  type: SET_BOX,
  box,
});


export const addBox = (id, tag) => ({
  type: ADD_BOX,
  box: {
    id: +id,
    x: 960,
    y: 100,
    width: 100,
    height: 50,
    children: Map(),
    parent: null,
    tag,
    css: 'p10 ',
  },
});


export const removeBox = boxId => ({
  type: REMOVE_BOX,
  boxId,
});


export const setParent = (parentId, childId) => ({
  type: SET_PARENT,
  parentId,
  childId,
});


export const addChild = (parentId, childId) => ({
  type: ADD_CHILD,
  parentId,
  childId,
});

export const removeParent = childId => ({
  type: REMOVE_PARENT,
  childId,
});

export const removeChild = (parentId, childId) => ({
  type: REMOVE_CHILD,
  parentId,
  childId,
});

export const copyBox = (boxId, newBoxId) => ({
  type: COPY_BOX,
  boxId,
  newBoxId,
});

export const load = (newLayout) =>{
  return {
    type: LOAD_LAYOUT,
    newLayout, //TODO: make this dispatch to load
  }
}

export const save = ()=>{
  return {
    type: SAVE

  }
}

const boxesReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SET_BOX:
      return prevState.set(action.box.id, fromJS(action.box));
    case ADD_BOX:
      return prevState.set(action.box.id, fromJS(action.box));
    case REMOVE_BOX:
      return prevState.delete(action.box.id);
    case SET_PARENT:
      return prevState.setIn([action.childId, 'parent'], action.parentId);
    case ADD_CHILD:
      if (!prevState[action.parentId].children.includes(action.childId)) {
        return prevState.parentId.update('children', (childMap) => {
          return childMap.push(action.childId);
        });
      }
      break;
    case REMOVE_PARENT:
      return prevState.setIn([action.childId, 'parent'], null);
    case REMOVE_CHILD:
      return prevState.parentId.update('children', (childMap) => {
        return childMap.filter(child => child.id !== action.childId);
      });
    case COPY_BOX:
      const newBox = prevState[action.boxId].withMutations((oldBox) => {
        oldBox
          .set('id', action.newBoxId)
          .set('x', 960)
          .set('y', 100)
          .set('children', Map())
          .set('parent', null);
      });
      return prevState.set(action.newBoxId, newBox);
    case LOAD_LAYOUT:
      return action.newLayout; // this might work
    case SAVE:
      return prevState;
    default:
      return prevState;
  }
};

export default boxesReducer;

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
