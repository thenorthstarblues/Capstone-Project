const initialState = {
  0: {
    id: 0,
    x: 0,
    y: 0,
    width: 900,
    height: 600,
    children: [],
    parent: null,
  }
};

//constants
const ADD_BOX = 'ADD_BOX'
const REMOVE_BOX = 'REMOVE_BOX'
const SET_BOX = 'SET_BOX'
const SET_PARENT = 'SET_PARENT'
const ADD_CHILD = 'ADD_CHILD'
const REMOVE_PARENT = 'REMOVE_PARENT'
const REMOVE_CHILD = 'REMOVE_CHILD'

//action creators
export const setBox = (box) => {
  return {
    type: SET_BOX,
    box
  }
}

export const addBox = (id) => {
  return {
    type: ADD_BOX,
    box: {
      id: id,
      x: 20,
      y: 20,
      width: 100,
      height: 100,
      children: [],
      parent: null,
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
  const newState = Object.assign({}, prevState)

  switch (action.type){
    case SET_BOX:
      newState[action.box.id] = action.box;
      break;
    case ADD_BOX:
      newState[action.box.id] = action.box;
      break;
    case REMOVE_BOX:
      delete newState[action.box.id];
      break;
    case SET_PARENT:
      newState[action.childId].parent = action.parentId;
      break;
    case ADD_CHILD:
      newState[action.parentId].children.push(action.childId);
      break;
    case REMOVE_PARENT:
      newState[action.childId].parent = null;
      break;
    case REMOVE_CHILD:
      newState[action.parentId].children = newState[action.parentId].filter(elem => elem !== action.childId)
    default:
      return prevState;
  }
  return newState;
}

export default boxesReducer;
