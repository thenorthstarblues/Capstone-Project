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
        overlap: 0.2,
      })
  }

  onDrop = (e) => {
    console.log('box was dropped')
    this.props.removeBox(+e.relatedTarget.id);
  }

  render() {
    return (
      <g>
          <rect x="1100" y="480" width="150" height="110" rx="2px" ry="2px" strokeWidth="3" className="basicBox" />
          <line x1="1100" y1="480" x2="1250" y2="590" strokeDasharray="3, 3" strokeWidth="1" stroke="black"/>
          <line x1="1100" y1="590" x2="1250" y2="480" strokeDasharray="3, 3" strokeWidth="1" stroke="black"/>
          <text x="1100" y="470">DROP HERE: to remove</text>
      </g>
    )
  }
}

export default TrashCan;
