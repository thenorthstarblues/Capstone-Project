import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

class Window extends Component {
  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .dropzone({
        ondrop: (e) => {
          const smallBox = this.props.boxes[+e.relatedTarget.id];
          if(smallBox.parent !== null) {
            this.props.removeChild(smallBox.parent, smallBox.id);
            this.props.removeParent(smallBox.id);
          }
          this.props.setParent(+e.target.id, smallBox.id);
          this.props.addChild(+e.target.id, smallBox.id);
        }
      })
  }

  render() {
    return (
      <rect className={`dropzone yes-drop pixelGrid`} id={0} height='500px' width='950px' x={1} y={1} rx="2px" ry="2px" />
    )
  }
}

export default Window;
