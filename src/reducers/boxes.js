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

const ADD_BOX = 'ADD_BOX'
const REMOVE_BOX = 'REMOVE_BOX'
const SET_BOX = 'SET_BOX'
const SET_PARENT = 'SET_PARENT'
const ADD_CHILD = 'ADD_CHILD'
const REMOVE_PARENT = 'REMOVE_PARENT'
const REMOVE_CHILD = 'REMOVE_CHILD'

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
    default:
      return prevState;
  }
  return newState;
}

export default boxesReducer;
