import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TrashCan from './components/TrashCan';
import AddOptions from './components/AddOptions';
import Box from './components/Box';
import Grid from './components/Grid';
import Window from './components/Window';
var elements = require('../server/db/models').element;
var layouts = require('../server/db/models').layout;
var app = require('../server/app');
import boxesReducer, {initialState} from './reducers/boxes';


it('Renders TrashCan component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TrashCan />, div);
});


it('loads all Options', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddOptions />, div);
});


it('renders Box', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Box />, div);
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
  
});

it('returns boxes State', ()=> {
  
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

