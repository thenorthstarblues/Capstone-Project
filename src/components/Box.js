import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';


class Box extends Component {
  constructor() {
    super();
    this.state = {
      x: 0,
      y: 0,
      wide: 100,
      high: 100,
    };
  }

  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .draggable({
        onmove: this.onMove,
      })
      .resizable({
		    preserveAspectRatio: false,
		    edges: { left: true, right: true, bottom: true, top: true }
		  })
      .on('resizemove', (event) => {
        const target = event.target;
        const x = this.state.x;
        const y = this.state.y;

        this.setState({
          x: x + event.deltaRect.left,
          y: y + event.deltaRect.top,
          high: event.rect.height,
          wide: event.rect.width,
        })
      });
  }

  style() {
    return {
      height: this.state.high,
      width: this.state.wide,
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
