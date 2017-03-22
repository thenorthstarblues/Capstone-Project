import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TrashCan from './components/TrashCan';
import AddOptions from './components/AddOptions';
import Patterns from './components/Patterns';
import Grid from './components/Grid';
import Window from './components/Window';
var elements = require('../server/db/models').element;
var layouts = require('../server/db/models').layout;
var app = require('../server/app');
import boxesReducer, {initialState} from './reducers/boxes';
import siblingReducer from './reducers/siblingReducer';
import {siblingReducer as sib2} from './reducers/siblingReducer2';


it('Renders TrashCan component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TrashCan />, div);
});


it('loads all Options', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddOptions />, div);
});


it('renders Pattern', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Patterns />, div);
});


it('Renders Grid without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Grid />, div);
});


it('Loads Window ', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Window />, div);
});

it('returns inital State', ()=> {
  const box = {};
  const stateTest= boxesReducer(initialState, box);
  console.log(stateTest);
});

it('returns sibling reducer State', ()=> {
  const box = {
    type: 'SIB_RECOG',
    boxesCss: ['testbox']
  };
  const sibling= boxesReducer({
    boxes:[],
    boxesCss:[]

  }, box);
  console.log(sibling);
  
});

it('returns Sib2 State', ()=> {
  
});




it('Can read elements model from the Database', ()=>{
  elements.findAll({})
  .then((s)=>{
    console.log(s)
  })
})

it('Can read layouts model from the Database', ()=>{
  layouts.findAll({})
  .then((s)=>{
    console.log(s)
  })
})

it('starts the server', ()=>{

})

