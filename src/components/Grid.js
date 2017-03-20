import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

//group graphic formatting to be completed later... only paragraph works
import { Paragraph, Ul, Table } from './Texts'; //for conditonal rendering
import { H1, H2, H3, H4 } from './Headers';
import { Div, Button, Alert } from './Basicformat';


class Grid extends Component {
  constructor(props) {
    super(props);
    this.onMove=this.onMove.bind(this);
    this.onDrop=this.onDrop.bind(this);
    this.restrict=this.restrict.bind(this);
  }

  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .draggable({
        onmove: this.onMove,
        snap: {
          targets: [interact.createSnapGrid({ x: 10, y: 10 })],
        },
        restrict: {
          restriction: {x: 60, y: 95, width: 1100, height: 700},
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true
        },
      })
      .resizable({
        preserveAspectRatio: false,
        invert: 'reposition',
        edges: { left: true, right: true, bottom: true, top: true },
        snap: {
          targets: [interact.createSnapGrid({ x: 10, y: 10 })],
        },
      })
      .on('resizemove', (event) => {
        const x = this.props.x;
        const y = this.props.y;
        this.props.setBox({
          id: this.props.id,
          x: x + event.deltaRect.left,
          y: y + event.deltaRect.top,
          height: event.rect.height,
          width: event.rect.width,
          children: this.props.children,
          parent: this.props.parent,
          tag: this.props.tag,
        })
      })
      .on('resizeend', (event) => {
        const left = this.props.x;
        const top = this.props.y;
        const right = left + this.props.width;
        const bottom = top + this.props.height;
        const boxIds = this.props.boxIds;
        const boxes = this.props.boxes;

        boxIds.forEach(box => {
          if (boxes[box].x < right && boxes[box].x > left){
            if (boxes[box].y < bottom && boxes[box].y > top){
              this.props.removeChild(boxes[box].parent.id || 0, +box);
              this.props.removeParent(+box);
              this.props.setParent(+event.target.id, +box);
              this.props.addChild(+event.target.id, +box);
            }
          }
        })
      })
      .dropzone({
          ondrop: this.onDrop,
      })
      .on('dragleave', (e) => {
        this.props.removeParent(+e.relatedTarget.id);
        this.props.removeChild(+e.target.id, +e.relatedTarget.id);
      })
  }

  onMove = (e) => {
    console.log(e);
    this.props.setBox({
          id: this.props.id,
          x: this.props.x + e.dx,
          y: this.props.y + e.dy,
          height: this.props.height,
          width: this.props.width,
          children: this.props.children,
          parent: this.props.parent,
          tag: this.props.tag,
        });
    }

  onDrop = (e) => {
    this.props.setParent(+e.target.id, +e.relatedTarget.id);
    this.props.addChild(+e.target.id, +e.relatedTarget.id);
  }

  restrict=((e)=> {
    return {
          restriction: this.props.parent,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
          endOnly: true
        };
  })


  render() {
    let typeClass;
    switch(this.props.tag){
      case('div'): typeClass = 'basicBox'; break;
      case('h1'): typeClass = 'basicH1'; break;
      case('img'): typeClass = 'basicImg'; break;
      default: typeClass = 'basicBox'; break;
    }


    return (
      <rect className={`dropzone yes-drop ${typeClass}`} id={this.props.id} height={this.props.height} width={this.props.width} x={this.props.x} y={this.props.y} rx="2px" ry="2px" />
    )
  }
}

export default Grid;
