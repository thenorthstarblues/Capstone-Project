import Immutable from 'immutable';
import {findSiblings} from './siblings';

const initialState = {
  preview: false,
};

export const ON_PREVIEW = 'ON_PREVIEW';

const setPreview = (bool) => ({
  type: ON_PREVIEW,
  preview: bool,
});

export const showPreview = (boxes) => (dispatch) => {
  dispatch(findSiblings(boxes));
  dispatch(setPreview(true));
};

export const hidePreview = () => (dispatch) => {
  dispatch(setPreview(false));
};

//---------------------------action reducer---------------------------
const previewReducer = (prevState = initialState, action) => {
  let newState=Object.assign({}, prevState);

  switch (action.type) {
    case ON_PREVIEW:
      newState.preview=action.preview;
      break;

    default:
      return prevState;
  }

  return newState;
};

export default previewReducer;

