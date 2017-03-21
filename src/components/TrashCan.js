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
          <rect x="1100" y="510" width="150" height="100" rx="2px" ry="2px" className="basicBox" />
          <text x="1100" y="500">DROP HERE: to remove</text>
      </g>
    )
  }
}

export default TrashCan;
