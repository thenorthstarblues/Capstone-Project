import axios from 'axios';
import Immutable from 'immutable';
import { makeGroup, addPage, setCurrent } from './groups';


export const LOAD_LAYOUT = 'LOAD_LAYOUT';
export const SAVE = 'SAVE';

export const load = (newLayout) => ({
    type: LOAD_LAYOUT,
    newLayout, //TODO: make this dispatch to load
  });

export const save = () => ({
    type: SAVE
  });

export const loadLayout = id => (dispatch) => {
  axios.get(`api/elements/layout/${id}`)
  .then((elements) => {
    const data = elements.data;
    let newState = {};
    data.forEach((element) => {
      const id = element.layId;
      delete element.layId;
      delete element.createdAt;
      delete element.updatedAt;
      delete element.layoutId;
      element.id = id;
      const parent = element.parent;
      if (parent !== null){element.parent = parent.toString()}
      //newState[id] = element;
      let children = [];
      if (element.children) { children = [...element.children.split(',')]; }
      const childrenArr = children.map(val => +val);
      element.children = Immutable.List(childrenArr);
      newState[id] = Immutable.Map(element);
    });
    newState = Immutable.Map(newState);
    dispatch(load(Immutable.fromJS(newState)));
  });
};

export const saveLayout = stateCopy => (dispatch) => {
  axios.post('api/layouts', {
    name: 'layout',
    author: 'me',
  })
    .then((layout) => {
      const id = layout.data.id;
      const makeelements = []; // converting to array
      const elemClone = Object.assign({}, stateCopy);
      const elementIdArr = Object.keys(elemClone);
      for (let i = 0; i < elementIdArr.length; i++) {
        const elem = elemClone[i];
        const layId = elem.id;
        elem.children = elem.children.join(',');
        delete elem.id;
        const newElement = Object.assign({}, elem, { layId, layoutId: id });
        makeelements.push(axios.post('/api/elements', newElement));
      }

      Promise.all(makeelements).then((result) => {
        dispatch(loadLayout(id));
        dispatch(setCurrent(id));
      });
    });
};

export const saveGroup = (name, currentId) => (dispatch) => {
  axios.post('/api/group', {
    name,
  })
    .then((group) => {
      const id = group.data.id;
      dispatch(makeGroup(id));
      axios.put(`/api/layouts/${currentId}`, { groupId: id },
      )
      .then((s) => {
        dispatch(addPage(currentId));
      });
    });
};
