
import axios from 'axios'
const initialState = {

  0: {
    height: 500,
    width: 950,
    children: [],
    id: 0,
    x: 0,
    y: 0,
    parent: null,
    tag: 'div',
    css: '',
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
      y: 100,
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

//reducer
const boxesReducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type){
    case SET_BOX:
      newState[action.box.id] = action.box;
      break;
    case ADD_BOX:
      newState[action.box.id] = action.box;
      break;
    case REMOVE_BOX:
      delete newState[action.boxId];
      break;
    case SET_PARENT:
      newState[+action.childId].parent = action.parentId;
      break;
    case ADD_CHILD:
        if(!newState[action.parentId].children.includes(action.childId)) newState[action.parentId].children.push(action.childId);
      break;
    case REMOVE_PARENT:
      newState[action.childId].parent = null;
      break;
    case REMOVE_CHILD:
      newState[action.parentId].children = newState[action.parentId].children.filter(id => id != action.childId);
      break;
    case LOAD_LAYOUT:
      return action.newLayout; // this might work
    case SAVE:
      return prevState;
    default:
      return prevState;
  }
  return newState;
}

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
