import Immutable from 'immutable';

const initialState = Immutable.Map({
  group: 0,
  pages: Immutable.List(),
  currentPage: 0,
});

const pageReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case 'MAKE_GROUP':
      return prevState.set('group', action.group);
    case 'ADD_PAGE':
      return prevState.update('pages', (pagesList) => {
        return pagesList.push(action.page);
      });
    case 'SET_CURRENT':
      return prevState.set('currentPage', action.id);
    default:
      return prevState;
  }
};

export default pageReducer;
