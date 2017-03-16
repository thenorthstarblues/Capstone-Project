import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';


class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      wide: this.props.w,
      high: this.props.h,
      parents: [],
      children: [],
    }
    this.onMove=this.onMove.bind(this);
  }

  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .draggable({
        onmove: this.onMove,
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

      })
      .dropzone({
        // only accept elements matching this CSS selector
        accept: '.yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.1,

        // listen for drop related events:

        ondropactivate: function (event) {
          // add active dropzone feedback
          event.target.classList.add('drop-active');
        },
        ondragenter: function (event) {
          var draggableElement = event.relatedTarget,
              dropzoneElement = event.target;

          // feedback the possibility of a drop
          dropzoneElement.classList.add('drop-target');
          draggableElement.classList.add('can-drop');
          draggableElement.textContent = 'Dragged in';
        },
        ondragleave: function (event) {
          // remove the drop feedback style
          event.target.classList.remove('drop-target');
          event.relatedTarget.classList.remove('can-drop');
          event.relatedTarget.textContent = 'Dragged out';
        },
        ondrop: function (event) {
          event.relatedTarget.textContent = 'Dropped';
          console.log('thing dropped: ', event.relatedTarget, 'box dropped into: ', event.target );
        },
        ondropdeactivate: function (event) {
          // remove active dropzone feedback
          event.target.classList.remove('drop-active');
          event.target.classList.remove('drop-target');
        }
      });

  }

  onMove=((e)=>{
    this.setState({
      x: this.state.x + e.dx,
      y: this.state.y + e.dy,
    });

  });

  // style() {
  //   return {
  //     height: this.state.high,
  //     width: this.state.wide,
  //   }
  // }

  style() {
    return {
      height: this.state.high,
      width: this.state.wide,
      transform: `translate(${this.state.x}px, ${this.state.y}px)`,
    }
  }

  render() {

    //we should change the interaction type

    return (
      <div className="dropzone yes-drop" style={this.style()}></div>
    )
  }
}

export default Grid;
