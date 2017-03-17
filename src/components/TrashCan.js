import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';


class TrashCan extends Component {
  constructor(props) {
    super(props);
    this.onDrop=this.onDrop.bind(this);
  }

  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .dropzone({
        ondrop: this.onDrop,
      })
  }

  onDrop = (e) => {
    console.log('box was dropped')
    this.props.removeBox(+e.relatedTarget.id);
  }

  render() {
    return (
      <g>
          <rect x="910" y="350" width="190" height="200" rx="2px" ry="2px" className="basicBox" />
          <text x="1000" y="400">TRASH ZONE</text>
      </g>
    )
  }
}

export default TrashCan;
