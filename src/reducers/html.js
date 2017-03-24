import Immutable from 'immutable';
import { getFormattedHtml, getCss, getHtml } from '../components/previewCreator';
import { theCss } from './stockCss';

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

export const createCss = elements => (dispatch) => {
  const { css } = getHtml(elements);
  const cssString = getCss(theCss, css);
  dispatch(setCss(cssString));
};

export const htmlCreator = elements => (dispatch) => {
  const htmlString = getFormattedHtml(elements);
  dispatch(setHtml(htmlString));
};

const htmlReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case CREATE_HTML:
      return prevState.set('html', Immutable.fromJS(action.html));
    case CREATE_CSS:
      return prevState.set('css', Immutable.fromJS(action.css));
    default:
      return prevState;
  }
};

export default htmlReducer;
