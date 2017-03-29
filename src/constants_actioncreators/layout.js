import axios from 'axios';
import Immutable from 'immutable';
import { makeGroup, addPage, setCurrent } from './groups';
import {clearAll, addBox, setBox} from './boxes'

export const LOAD_LAYOUT = 'LOAD_LAYOUT';
export const SAVE = 'SAVE';

export const load = newLayout => ({
  type: LOAD_LAYOUT,
  newLayout, //TODO: make this dispatch to load
});

export const save = () => ({
  type: SAVE,
});

export const loadLayout = id => (dispatch) => {
  dispatch(clearAll())
  //let loads = [];
  axios.get(`api/elements/layout/${id}`)
  .then((elements) => {
    const data = elements.data;
    let loads = [];
    data.forEach((element) => {
      if (element.id === 0 )return;
      let Elemid = element.layId;
      loads.push(dispatch(addBox(Elemid)))
      delete element.layId;
      delete element.createdAt;
      delete element.updatedAt;
      delete element.layoutId;
      element.id = Elemid;
      const parent = element.parent;
      if (parent === 0){element.parent = parent.toString()}
      //let children = [];
      if (element.children) { element.children = [...element.children.split(',').map(val=>+val)]; }
      else{element.children=[]}
      //const childrenArr = children.map(val => +val);
      loads.push(dispatch(setBox(element)));
      //element.children = childrenArr;
      //newState[id] = element;
    });
    Promise.all(loads).then(()=>{
      dispatch(setCurrent(id));

    })
    //newState = Immutable.Map(newState);
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
      //const elemClone = Object.assign({}, stateCopy);
      const elementIdArr = Object.keys(stateCopy);
      for (let i = 0; i < elementIdArr.length; i++) {
        const elem = stateCopy[i];
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

export const saveGroup = (name, currentId, elements) => (dispatch) => {
  axios.post('/api/group', {
    name,
  })
    .then((group) => {
      const id = group.data.id;
      dispatch(makeGroup(id));
      if(currentId !== 0){
      axios.put(`/api/layouts/${currentId}`, { groupId: id },
      )
      .then((s) => {
        dispatch(addPage(currentId));
      })
    }
    else {
      dispatch(addToGroup(elements, id,true))
      
    }
    });
};


export const addToGroup = (stateCopy, groupId,base) => (dispatch) => {
  axios.post('api/layouts', {
    name: 'layout',
    author: 'me',
    groupId: groupId
  })
    .then((layout) => {
      
      const id = layout.data.id;
      if(base){
        dispatch(setCurrent(id))
      }
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
      dispatch(addPage(id));
    });
};

