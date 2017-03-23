import Immutable from 'immutable';
import { getFormattedHtml, getCss } from '../components/previewCreator';

const initialState = Immutable.Map({
  html: '',
  css: '',
});

const CREATE_HTML = 'CREATE_HTML';
const CREATE_CSS = 'CREATE_CSS';

const setHtml = html => ({
  type: CREATE_HTML,
  html,
});

const setCss = css => ({
  type: CREATE_CSS,
  css,
});

export const createCss = () => (dispatch) => {
  const cssString = getCss();
  dispatch(setCss(cssString));
};

export const htmlCreator = elements => (dispatch) => {
  const htmlString = getFormattedHtml(elements);
  dispatch(setHtml(htmlString));
};

const htmlReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case CREATE_HTML:
      return prevState.set('html', action.html);
    case CREATE_CSS:
      return prevState.set('css', action.css);
    default:
      return prevState;
  }
};

export default htmlReducer;
