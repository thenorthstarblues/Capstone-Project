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
    this.onleave=this.onleave.bind(this);
    this.restrict=this.restrict.bind(this);
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
        restrict: this.restrict,//bind to local and get parent from state NOT WORKING!!!!!
        // restrict: { //so how to lock elements to their parents... without knowing their parents
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
        overlap: 1,

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
        ondragleave: this.onleave, //dragged out... remove child here
        ondrop: this.ondrop, //stopped moving, child added to list
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

  ondrop=((e)=>{ // adds child ditto to dispatch
    e.relatedTarget.textContent = 'Dropped';

    var newChild =this.state.children.concat(e.relatedTarget.id);
    this.setState({children: newChild});
    //child is easy... based on listening structure ... parent will be rough...
  })

  onleave=((e)=> { //will have a dispatch action later...
    var children = this.state.children;
    var childLocation = this.state.children.indexOf(e.relatedTarget.id);
    if (childLocation){ //will have a dispatch action later...
      children[childLocation]= null;
    };

    this.setState({children: children}); //not longer fucking with this! moving onto size issues.

    console.log('leave:', e);
          e.target.classList.remove('drop-target');
          e.relatedTarget.classList.remove('can-drop');
          e.relatedTarget.textContent = 'Dragged out';

  })

  restrict=((e)=> { //not yet working
    console.log(this.state.parent);
    return {
          restriction: this.state.parent,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true
        };
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
