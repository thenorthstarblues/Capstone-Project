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
    this.props.removeBox(+e.relatedTarget.id);
  }

  render() {
    let x= 959, y= 345, width= 155, height= 155, x2= x+width, y2= y+height;

    return (
      <g>
          <rect x={x} y={y} width={width} height={height} rx="2px" ry="2px" strokeWidth="3" className="basicBoxBk" />
          <line x1={x} y1={y} x2={x2} y2={y2} strokeDasharray="3, 3" strokeWidth="1" stroke="black"/>
          <line x1={x} y1={y2} x2={x2} y2={y} strokeDasharray="3, 3" strokeWidth="1" stroke="black"/>
          <text x={x} y={y-20} fontFamily="TrendHandMade" >DROP HERE</text>
          <text x={x+10} y={y-5} fontFamily="Trenda" >to remove item</text>
      </g>
    )
  }
}

export default TrashCan;
