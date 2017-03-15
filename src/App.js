import React, { Component } from 'react';
import './App.css';
import InteractionTests from './components/interactionTests.js';

class App extends Component {
  render() {
    return (
      <div className="App col-lg-12">
        <InteractionTests />
      </div>
    );
  }
}

export default App;
