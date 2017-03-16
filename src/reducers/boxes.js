const initialState = {};

//constants
const ADD_BOX = 'ADD_BOX'
const LOAD_PARENT_BOX = 'LOAD_PARENT_BOX'
const REMOVE_BOX = 'REMOVE_BOX'
const SET_BOX = 'SET_BOX'

//action creators
export const setBox = (box) => {
  return {
    type: SET_BOX,
    box
  }
}

export const addBox = (box) => {
  return {
    type: ADD_BOX,
    box: {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    }
  }
}

export const loadParentBox = () => {
  return {
    type: LOAD_PARENT_BOX,
    box: {
      id: 0,
      x: 0,
      y: 0,
      width: 900,
      height: 600,
    }
  }
}

export const removeBox = (boxId) => {
  return {
    type: REMOVE_BOX
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
      const box = action.box;
      box.id = Object.keys(newState).length;
      newState[box.id] = box;
      break;
    case REMOVE_BOX:
      delete newState[action.box.id];
      break;
    case LOAD_PARENT_BOX:
      newState[0] = action.box;
      break;
    default:
      return prevState;
  }
  return newState;
}

export default boxesReducer;
