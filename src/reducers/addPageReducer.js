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

