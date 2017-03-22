const htmlState ={
  html: '//HTML',
  css:'//CSS',
}

//conversion functions
import {getFormattedHtml, getCss} from '../components/previewCreator'
const CREATE_HTML = 'CREATE_HTML'
const CREATE_CSS = 'CREATE_CSS'
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
 // const elemCopy = Object.assign({}, elements);
   return dispatch => {
     const htmlString = getFormattedHtml(elements);
     dispatch(setHtml(htmlString))
   }
}



const htmlReducer = (state = htmlState, action)=>{
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

export default htmlReducer;
