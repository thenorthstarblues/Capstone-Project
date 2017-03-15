import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';


class Box extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
    };
    this.onMove = this.onMove.bind(this);
  }
  onMove(e) {
   let coordsObj = { x: this.state.x + e.dx, y: this.state.y + e.dy }
   this.setState(coordsObj);
  }
  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .draggable({
        onmove: this.onMove,
      });
  }

  style() {
    return {
      height: 100,
      width: 100,
      backgroundColor: "none",
      border: "solid",
      display: "inline-block",
      borderRadius: 5,
      transform: `translate(${this.state.x}px, ${this.state.y}px)`,
    }
  }
  render() {
    return (
      <div style={this.style()}></div>
    )
  }
}

export default Box;
