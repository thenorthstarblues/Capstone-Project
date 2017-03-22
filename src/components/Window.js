import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

class Window extends Component {
  constructor(props){
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .dropzone({
          ondrop: this.onDrop,
      })
      .on('dragleave', (e) => {
        this.props.removeParent(+e.relatedTarget.id);
        this.props.removeChild(+e.target.id, +e.relatedTarget.id);
      })
  }

  onDrop = (e) => {
    console.log(e.relatedTarget.id + ' became the child of ' + e.target.id);
    this.props.setParent(+e.target.id, +e.relatedTarget.id);
    this.props.addChild(+e.target.id, +e.relatedTarget.id);
  }

  render() {
    return (
      <rect className={`dropzone yes-drop pixelGrid`} id={0} height='500px' width='950px' x={1} y={1} rx="2px" ry="2px" />
    )
  }
}

export default Window;
