import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

class Window extends Component {
  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .dropzone({
        ondrop: (e) => {
          this.props.removeParent(e.relatedTarget.id);
          this.addParentChild(e.target.id, e.relatedTarget.id);
        }
      })
  }

  addParentChild = (parent, child) => {
    this.props.setParent(+parent, +child);
    this.props.addChild(+parent, +child);
  }

  render() {
    return (
      <rect className={`dropzone yes-drop basicBox`} id={0} height='600px' width='900px' x={0} y={0} rx="2px" ry="2px" />
    )
  }
}

export default Window;
