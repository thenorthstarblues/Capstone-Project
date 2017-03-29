import Immutable from 'immutable';

const initialState = Immutable.Map({
  group: 0,
  pages: Immutable.List(),
  pageLayouts: Immutable.List(), //new
  currentPage: 0,
  groups: Immutable.List(),
});

const pageReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'MAKE_GROUP':
      return prevState.set('group', action.group);
    case 'ADD_PAGE':
      return prevState.update('pages', (pagesList) => pagesList.push(action.page));
    case 'SET_CURRENT':
      return prevState.set('currentPage', action.id);
    case 'SET_GROUPS':
      return prevState.set('groups', Immutable.fromJS(action.groups));
    case 'SET_PAGES':
      return prevState.set('pages', action.pages);
    case 'HOLD_PAGES':
      return prevState.set('pageLayouts', action.pageLayouts); //new
    default:
      return prevState;
  }
};

export default pageReducer;
