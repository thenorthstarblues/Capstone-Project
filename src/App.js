
import React, { Component } from 'react';
import './App.css';
import InteractionTests from './components/interactionTests.js';
import {connect} from 'react-redux';
import CodeModal from './codemirror_modal';
import {codetest} from './Codemirror';
import SplitPane from 'react-split-pane';
import Code from './Codemirror';

class App extends Component {

render = ()=>{
  return(
      <div className="App">
        <SplitPane split="vertical" defaultSize={200} primary="first">
        <div>
          <Code />
        </div>
        <div>
          <div className="App col-lg-12">
            <InteractionTests />
          </div>
          <CodeModal />
         </div>
      </SplitPane>
      </div>
    )
}

}

export default connect(mstp,mdtp)(App);



const mstp = (state) =>{
  return {}

}

const mdtp = (dispatch) => {
  return {}
}
