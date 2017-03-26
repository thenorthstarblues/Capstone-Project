import axios from 'axios';
import { makeGroup, addPage, setCurrent } from './addPageReducer';
import Immutable from 'immutable';
import { SET_BOX, ADD_BOX, REMOVE_BOX, SET_PARENT, ADD_CHILD, REMOVE_PARENT, REMOVE_CHILD, COPY_BOX, CLEAR_ALL } from '../constants_actioncreators/boxes';
import { LOAD_LAYOUT, SAVE } from '../constants_actioncreators/layout';

export const initialState = Immutable.Map({
  0: Immutable.Map({
    height: 500,
    width: 950,
    children: Immutable.List(),
    id: 0,
    x: 0,
    y: 0,
    parent: null,
    tag: 'div',
    css: '',
  }),
});

const boxesReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case SET_BOX:
      return prevState.set(action.box.id, Immutable.fromJS(action.box));
    case ADD_BOX:
      return prevState.set(action.box.id, Immutable.fromJS(action.box));
    case REMOVE_BOX:
      return prevState.delete(action.boxId);
    case SET_PARENT:
      return prevState.setIn([action.childId, 'parent'], action.parentId);
    case ADD_CHILD:
      return prevState.updateIn([action.parentId, 'children'], (childMap) => {
        return childMap.push(action.childId);
      });
    case REMOVE_PARENT:
      return prevState.setIn([action.childId, 'parent'], null);
    case REMOVE_CHILD:
      return prevState.updateIn([action.parentId, 'children'], (childMap) => {
        return childMap.filter(child => child !== action.childId);
      });
    case COPY_BOX:
      const newBox = prevState.get(action.boxId).withMutations((oldBox) => {
        oldBox
          .set('id', action.newBoxId)
          .set('x', 960)
          .set('y', 100)
          .set('children', Immutable.List())
          .set('parent', null);
      });
      return prevState.set(action.newBoxId, newBox);
    case LOAD_LAYOUT:
      return prevState.clear().merge(action.newLayout);
    case SAVE:
      return prevState;
    case CLEAR_ALL:
      //return initialState;
      return prevState.clear().merge(initialState);
    default:
      return prevState;
  }
};

export default boxesReducer;

