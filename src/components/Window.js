import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

class Window extends Component {
  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .dropzone(true)
  }

  render() {
    return (
      <rect className={`dropzone yes-drop basicBox`} id={0} height='600px' width='900px' x={0} y={0} rx="2px" ry="2px" />
    )
  }
}

export default Window;
