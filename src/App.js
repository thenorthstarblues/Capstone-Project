import React from 'react';
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

const test = ()=>{
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

const App = connect(mstp,mdtp)(test);


export default App;
