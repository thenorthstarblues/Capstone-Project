import axios from 'axios';
import {loadLayout, saveLayout} from './boxes';



const initialState = {
  group: 0,
  pages: [],
  currentPage: 0,
};

const pageReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);

  switch (action.type) {
      case 'MAKE_GROUP':
        newState.group = action.group;
        break;
      case 'ADD_PAGE':
        newState.pages = [...newState.pages, action.page];
        break;
      case "SET_CURRENT":
        newState.currentPage = action.id;
        break;
      default:
        return state;
    }
  return newState;
};

export default pageReducer;


export const newPage = () => (dispatch) => {

};

export const makeGroup = group => ({
  type: 'MAKE_GROUP',
  group,
});

export const addPage = page => ({
  type: 'ADD_PAGE',
  page,
});

export const setCurrent = (id) => ({
    type: "SET_CURRENT",
    id
});

export const updatePage = (id, stateCopy) => (dispatch) => {
  axios.get(`api/layouts/${id}`)
    .then((layout) => {
        axios.delete(`api/elements/${id}`)
        .then((result)=>{
      const makeelements = []; // converting to array
      const elemClone = Object.assign({}, stateCopy);
      const elementIdArr = Object.keys(elemClone);
      for (let i = 0; i < elementIdArr.length; i++) {
        const elem = elemClone[i];
        const layId = elem.id;
        elem.children = elem.children.join(',');
        delete elem.id;
        const newElement = Object.assign({}, elem, { layId, layoutId: id });
        makeelements.push(axios.post('/api/elements', newElement));
      }

      Promise.all(makeelements).then((result) => {
          console.log('')
        dispatch(loadLayout(id));
      });
    })
    });
};

export const saveOrUpdate = (stateCopy, id) => (dispatch) => {
    if(id !== 0){
        console.log('update page', id)
        dispatch(updatePage(id, stateCopy))
    }
    else{
        console.log('save layout')
         dispatch(saveLayout(stateCopy))
          
        }
    
}