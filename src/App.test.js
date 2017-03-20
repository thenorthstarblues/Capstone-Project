import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TrashCan from './components/TrashCan';
import AddOptions from './components/AddOptions';
import Box from './components/Box'


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


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });
