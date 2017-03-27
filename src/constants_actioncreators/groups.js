import { loadLayout, saveLayout } from './layout';
import axios from 'axios';
import Immutable from 'immutable'
export const makeGroup = group => ({
  type: 'MAKE_GROUP',
  group,
});

export const addPage = page => ({
  type: 'ADD_PAGE',
  page,
});

export const setCurrent = id => ({
  type: 'SET_CURRENT',
  id,
});

export const setGroups = groups => ({
  type: 'SET_GROUPS',
  groups,
});

export const addGroup = newGroup => ({
  type: 'ADD_GROUP',
  newGroup,
});
export const setPages = pages => ({
  type: 'SET_PAGES',
  pages,
});

export const getTemplates =()=> (dispatch)=>{
  axios.get('/api/group').then((groups) => {
    console.log(groups.data)
    const groupId = groups.data.map(group => group.id);
    dispatch(setGroups(groupId));
  });
};

export const getLayouts = (id) => (dispatch) => {
  axios.get(`api/layouts/group/${id}`)
    .then((layouts) => {
      const layoutsArr = layouts.data.map((layout)=>layout.id);
      console.log(layoutsArr);
      dispatch(setPages(Immutable.fromJS(layoutsArr))); //this is only because for some reason it is back an object
    });
};
export const updatePage = (id, stateCopy) => (dispatch) => {
  axios.get(`api/layouts/${id}`)
    .then((layout) => {
      axios.delete(`api/elements/${id}`)
        .then((result) => {
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
      });
        });
    });
};

export const saveOrUpdate = (stateCopy, id) => (dispatch) => {
  if (id !== 0) {
    dispatch(updatePage(id, stateCopy));
  } else {
    dispatch(saveLayout(stateCopy));
  }
};
