import axios from 'axios'
const initialState = {
  0: {
    height: 600,
    width: 900,
    children: [],
    id: 0,
    x: 0,
    y: 0,
    parent: null,
    tag: 'div',
    css: '',
  }
};


const htmlState ={
  html: '//HTML',
  css:'//CSS'
}

//conversion functions
import {getFormattedHtml, getCss} from '../components/previewCreator'

//constants
const ADD_BOX = 'ADD_BOX'
const REMOVE_BOX = 'REMOVE_BOX'
const SET_BOX = 'SET_BOX'
const SET_PARENT = 'SET_PARENT'
const ADD_CHILD = 'ADD_CHILD'
const REMOVE_PARENT = 'REMOVE_PARENT'
const REMOVE_CHILD = 'REMOVE_CHILD'
const CREATE_HTML = 'CREATE_HTML'
const CREATE_CSS = 'CREATE_CSS'
const LOAD_LAYOUT = 'LOAD_LAYOUT'
//action creators
const setHtml = (html)=>{
  return {
    type: CREATE_HTML,
    html
  }
}
const setCss = (css)=>{
  return {
    type:CREATE_CSS,
    css
  }
}

export const createCss = () =>{ //eventually pass something in
   return dispatch => {
     const cssString =getCss();
     dispatch(setCss(cssString))
   }
}

export const htmlCreator = (elements) =>{
  const elemCopy = Object.assign({}, elements);
   return dispatch => {
     const htmlString = getFormattedHtml(elemCopy);
     dispatch(setHtml(htmlString))
   }
}

export const setBox = (box) => {
  return {
    type: SET_BOX,
    box
  }
}
const fake=() => {
  return {
    type: 'lala'
  }
}

export const addBox = (id, tag) => {
  return {
    type: ADD_BOX,
    box: {
      id: +id,
      x: 950,
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
      if(!newState[action.parentId].children.includes(action.childId)){
        newState[action.parentId].children.push(action.childId);
      }
      break;
    case REMOVE_PARENT:
      newState[action.childId].parent = null;
      break;
    case REMOVE_CHILD:
      newState[action.parentId].children = newState[action.parentId].children.filter(elem => elem !== action.childId);
      break;
    case LOAD_LAYOUT:
      return action.newLayout; // this might work
    default:
      return prevState;
  }
  return newState;
}

export default boxesReducer;



export const htmlReducer = (state = htmlState, action)=>{
  const newState = Object.assign({}, state);
  switch(action.type){
    case CREATE_HTML:
      newState.html = action.html;
      break;
    case CREATE_CSS:
      newState.css = action.css;
      break;
    default:
      return state;
  }
  return newState;
}

export const loadLayout = (id) => {
  
  return (dispatch) => {
    axios.get(`api/elements/layout/${id}`)
  .then((elements)=> {
    const data = elements.data;
    let state = {}
    data.forEach((element)=>{
      const id = element.layId;
      delete element.layId;
      delete element.createdAt;
      delete element.updatedAt;
      delete element.layoutId;
      element.id = id;
      state[id] = element;
      console.log('yo',element.children)
      let children = [];
      if(element.children) {children = [...element.children.split(',')]}
      console.log('what is this', children)
      const childrenArr = children.map(val=>{
        return +val;
      })
      //if (!childrenArr.length) 
      //element.children=[...children]
      console.log(childrenArr)
      element.children= childrenArr;
      //turn children into an array
    })
    dispatch(load(state))
  })}
}
export const saveLayout = (name,elements) => {
  console.log(elements)
  return (dispatch) => {
  axios.post('api/layouts', {
    name: name,
    author: name,
    })
    .then((layout)=> {
    console.log(layout.data.id)
      const id = layout.data.id
      console.log(id);
      const makeelements =[];
      const elemClone = Object.assign({},elements);
      const elementIdArr = Object.keys(elemClone);
      for (var i = 0; i <elementIdArr.length; i++){
        const elem = elements[i];
        const layId = elem.id;
        elem.children = elem.children.join(',')
        delete elem.id;
        const newElement = Object.assign({}, elem, {layId: layId, layoutId:id})
        //console.log(newElement)
        makeelements.push(axios.post('/api/elements', newElement))
      }

      Promise.all(makeelements).then((result)=>{
        
      dispatch(loadLayout(id))
        
        //dispatch(setCss(cssString2))
        //dispatch(clearTable())

      })
      //api/block
      //axios post for each block
      //dispatch 
    } )
  }
}

/*
load layout 
axios . then 
dispatch change state thingy 
*/