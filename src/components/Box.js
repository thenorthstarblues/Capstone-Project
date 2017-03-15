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
      })
      .resizable({
		    preserveAspectRatio: false,
		    edges: { left: true, right: true, bottom: true, top: true }
		  })
      .on('resizemove', (event) => {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0);
        const y = (parseFloat(target.getAttribute('data-y')) || 0);

        this.setState({
          x: event.deltaRect.left,
          y: event.deltaRect.top,
          high: event.rect.height,
          wide: event.rect.width,
        })

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
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
