import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {dispatchTest} from './reducers/rootReducer';

const mstp = (state) =>{
  return {}
}

const mdtp = (dispatch) => {
  return {
    test (){
      dispatch(dispatchTest('woohoo'))
    }
  }
}

class App extends Component {
  render(){
    return(
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      )
  }
}

export default connect(mstp,mdtp)(App);
