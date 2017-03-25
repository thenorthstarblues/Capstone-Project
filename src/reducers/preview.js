import Immutable from 'immutable';
import {previewSiblings} from './siblings';

export const initialState = Immutable.Map({
  preview: false,
});

export const ON_PREVIEW = 'ON_PREVIEW';

const setPreview = (bool) => ({
  type: ON_PREVIEW,
  preview: bool,
});

export const showPreview = (boxes) => (dispatch) => {
  dispatch(previewSiblings(boxes));
  dispatch(setPreview(true));
};

export const hidePreview = () => (dispatch) => {
  dispatch(setPreview(false));
};

//---------------------------action reducer---------------------------
const previewReducer = (prevState = initialState, action) => {

  switch (action.type) {
    case ON_PREVIEW:
      return prevState.set('preview', action.preview);

    default:
      return prevState;
  }

};

export default previewReducer;

