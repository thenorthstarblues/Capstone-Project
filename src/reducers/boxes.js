import { Map, List, fromJS } from 'immutable';
import { SET_BOX, ADD_BOX, REMOVE_BOX, SET_PARENT, ADD_CHILD, REMOVE_PARENT, REMOVE_CHILD, COPY_BOX } from '../constants_actioncreators/boxes';
import { LOAD_LAYOUT, SAVE } from '../constants_actioncreators/layout';

const initialState = Map({
  0: Map({
    height: 500,
    width: 950,
    children: List(),
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
      return prevState.set(action.box.id, fromJS(action.box));
    case ADD_BOX:
      return prevState.set(action.box.id, fromJS(action.box));
    case REMOVE_BOX:
      return prevState.delete(action.box.id);
    case SET_PARENT:
      return prevState.setIn([action.childId, 'parent'], action.parentId);
    case ADD_CHILD:
      if (!prevState[action.parentId].children.includes(action.childId)) {
        return prevState.parentId.update('children', (childMap) => {
          return childMap.push(action.childId);
        });
      }
      break;
    case REMOVE_PARENT:
      return prevState.setIn([action.childId, 'parent'], null);
    case REMOVE_CHILD:
      return prevState.parentId.update('children', (childMap) => {
        return childMap.filter(child => child.id !== action.childId);
      });
    case COPY_BOX:
      const newBox = prevState[action.boxId].withMutations((oldBox) => {
        oldBox
          .set('id', action.newBoxId)
          .set('x', 960)
          .set('y', 100)
          .set('children', List())
          .set('parent', null);
      });
      return prevState.set(action.newBoxId, newBox);
    case LOAD_LAYOUT:
      return action.newLayout; // this might work
    case SAVE:
      return prevState;
    default:
      return prevState;
  }
};

export default boxesReducer;
