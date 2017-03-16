import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';


class Box extends Component {
  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .draggable({
        onmove: this.onMove,
      })
      // .resizable({
		  //   preserveAspectRatio: true,
		  //   edges: { left: true, right: true, bottom: true, top: true }
		  // })
      // .on('resizemove', (event) => {
      //   const x = this.props.box.box.x;
      //   const y = this.props.box.box.y;

      //   this.props.setBox({
      //     x: x + event.deltaRect.left,
      //     y: y + event.deltaRect.top,
      //     high: event.rect.height,
      //     wide: event.rect.width,
      //   })
      // });
  }

  onMove=((e)=>{
    this.props.setBox({
      id: this.props.id,
      x: this.props.x + e.dx,
      y: this.props.y + e.dy,
      high: this.props.height,
      wide: this.props.width,
    });

  });


  style() {
    return {
      height: this.props.height,
      width: this.props.width,
      backgroundColor: "none",
      border: "solid",
      display: "inline-block",
      borderRadius: 5,
      transform: `translate(${this.props.x}px, ${this.props.y}px)`,
    }
  }

  render() {
    return (
      <div className="yes-drop" style={this.style()}></div>
    )
  }
}

export default Box;
