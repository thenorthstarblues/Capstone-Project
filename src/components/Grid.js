import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';


class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      id: this.props.id,
      wide: this.props.w,
      high: this.props.h,
      parent: [],
      children: [],
    }
    this.onMove=this.onMove.bind(this);
    this.ondrop=this.ondrop.bind(this);
  }

  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .draggable({
        onmove: this.onMove,
        snap: { // this then will snap to a 10 x 10 grid location... see example to make sure there is a consistent origin
          targets: [interact.createSnapGrid({ x: 10, y: 10 })],
          range: Infinity,
          relativePoints: [ { x: 0, y: 0 } ]
        },
        // restrict: {
        //   restriction: ReactDOM.findDOMNode(this).parentNode,
        //   elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        //   endOnly: true
        // },
      })
      .resizable({ // need to improve this logic
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

      })
      .dropzone({
        // only accept elements matching this CSS selector
        accept: '.yes-drop',
        // Require a 75% element overlap for a drop to be possible
        overlap: 0.9,

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
        ondrop: this.ondrop,
        ondropdeactivate: function (event) {
          // remove active dropzone feedback
          event.target.classList.remove('drop-active');
          event.target.classList.remove('drop-target');
        }
      });

  }

  //anything where you need both event relationships and access to local state... needs to be out here and bound to state.

  onMove=((e)=>{
    this.setState({
      x: this.state.x + e.dx,
      y: this.state.y + e.dy,
    });
  });


  ondrop=((e)=>{
    e.relatedTarget.textContent = 'Dropped';

    var newChild =this.state.children.concat(e.relatedTarget.id);
    this.setState({children: newChild});
    //child is easy... based on listening structure ... parent will be rough...

    console.log(this.state);
  })

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
      <div className="dropzone yes-drop" id={this.state.id} style={this.style()}></div>
    )
  }
}

export default Grid;
