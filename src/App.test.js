import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TrashCan from './components/TrashCan';
import AddOptions from './components/AddOptions';
import Box from './components/Box';
import Grid from './components/Grid';
import Window from './components/Window';

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

