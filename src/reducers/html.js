import Immutable from 'immutable';
import { getFormattedHtml, getFormattedHtmlPre, getCss, getHtml, head, end } from '../components/previewCreator';
import { theCss } from './stockCss';

const initialState = Immutable.Map({
  html: '',
  css: '',
  htmlPreview: '',
});

const CREATE_HTML_PREVIEW = 'CREATE_HTML_PREVIEW';
const CREATE_HTML = 'CREATE_HTML';
const CREATE_CSS = 'CREATE_CSS';

const setHtml = html => ({
  type: CREATE_HTML,
  html,
});

const setHtmlPreview = htmlPreview => ({
  type: CREATE_HTML_PREVIEW,
  htmlPreview,
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
  const fullHtml=head+htmlString+end;
  dispatch(setHtml(fullHtml));
};

export const htmlCreatorPreview = elements => (dispatch) => {
  const htmlString = getFormattedHtmlPre(elements);
  //insertion by innerHtml... no conversion, but need to add background color tags/lorem ipsum to fill in space for preview

  dispatch(setHtmlPreview(htmlString))
};

const htmlReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case CREATE_HTML_PREVIEW:
      return prevState.set('htmlPreview', Immutable.fromJS(action.htmlPreview));
    case CREATE_HTML:
      return prevState.set('html', Immutable.fromJS(action.html));
    case CREATE_CSS:
      return prevState.set('css', Immutable.fromJS(action.css));
    default:
      return prevState;
  }
};

export default htmlReducer;
