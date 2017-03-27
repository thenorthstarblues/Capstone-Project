export const ADD_BOX = 'ADD_BOX';
export const REMOVE_BOX = 'REMOVE_BOX';
export const SET_BOX = 'SET_BOX';
export const SET_PARENT = 'SET_PARENT';
export const ADD_CHILD = 'ADD_CHILD';
export const REMOVE_PARENT = 'REMOVE_PARENT';
export const REMOVE_CHILD = 'REMOVE_CHILD';
export const COPY_BOX = 'COPY_BOX';
export const CLEAR_ALL = 'CLEAR_ALL';


export const setBox = box => ({
  type: SET_BOX,
  box,
});


export const addBox = (id, tag) => ({
  type: ADD_BOX,
  box: {
    id,
    x: 960,
    y: 100,
    width: 100,
    height: 50,
    children: [],
    parent: null,
    tag,
    css: '',
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

export const clearAll = () => ({
  type: CLEAR_ALL,
});
