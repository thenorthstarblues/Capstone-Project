import React from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import CodeModal from './codemirror_modal';
import {codetest} from './Codemirror';
import SplitPane from 'react-split-pane';
import Code from './Codemirror';

const mstp = (state) =>{
  return {}

}

const mdtp = (dispatch) => {
  return {}
}

const App = ()=>{
  return(
      <div className="App">
    <SplitPane split="vertical" defaultSize={200} primary="first">
        <div>
          <Code />
        </div>
        <div>
          <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
          </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
             <CodeModal />
        </div>
    </SplitPane>
      </div>
    )
}



export default connect(mstp,mdtp)(App);
