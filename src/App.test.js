import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TrashCan from './components/TrashCan';



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('loads trash can component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TrashCan />, div);
});




