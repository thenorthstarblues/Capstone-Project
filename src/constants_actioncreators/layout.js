import axios from 'axios';

export const LOAD_LAYOUT = 'LOAD_LAYOUT';
export const SAVE = 'SAVE';

export const load = (newLayout) =>{
  return {
    type: LOAD_LAYOUT,
    newLayout, //TODO: make this dispatch to load
  }
}

export const save = ()=>{
  return {
    type: SAVE

  }
}

export const loadLayout = (id) => {
  return (dispatch) => {
    axios.get(`api/elements/layout/${id}`)
  .then((elements)=> {
    const data = elements.data;
    let newState = {}
    data.forEach((element)=>{
      const id = element.layId;
      delete element.layId;
      delete element.createdAt;
      delete element.updatedAt;
      delete element.layoutId;
      element.id = id;
      newState[id] = element;
      let children = [];
      if(element.children) {children = [...element.children.split(',')]}
      const childrenArr = children.map(val=>{
        return +val;
      })
      element.children= childrenArr;
    })
    dispatch(load(newState))
  })}
}

export const saveLayout = (name, stateCopy) => {
  return (dispatch) => {
  axios.post('api/layouts', {
    name: name,
    author: name,
    })
    .then((layout)=> {
      const id = layout.data.id
      const makeelements =[]; //converting to array
      const elemClone = Object.assign({},stateCopy);
      const elementIdArr = Object.keys(elemClone);
      for (var i = 0; i <elementIdArr.length; i++){
        const elem = elemClone[i];
        const layId = elem.id;
        elem.children = elem.children.join(',')
        delete elem.id;
        const newElement = Object.assign({}, elem, {layId: layId, layoutId:id})
        makeelements.push(axios.post('/api/elements', newElement))
      }

      Promise.all(makeelements).then((result)=>{

      dispatch(loadLayout(id))

      })
    } )
  }
}
