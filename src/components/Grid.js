import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

const snapGrid = { targets: [interact.createSnapGrid({ x: 7, y: 7 })], }

class Grid extends Component {
  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .draggable({
        onmove: (e) => {
          this.updateBox({
            x: this.props.x + e.dx,
            y: this.props.y + e.dy
          });
        },
        snap: snapGrid,
        restrict: {
          restriction: {x: 60, y: 95, width: 1500, height: 700},
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        },
      })
      .resizable({
        preserveAspectRatio: false,
        invert: 'reposition',
        edges: { left: true, right: true, bottom: true, top: true },
        snap: snapGrid,

      })
      .on('resizemove', (e) => {
        this.updateBox({
          x: this.props.x + e.deltaRect.left,
          y: this.props.y + e.deltaRect.top,
          height: e.rect.height,
          width: e.rect.width,
        })
      })
      .dropzone({
          ondrop: (e) => {
            const smallBox = this.props.boxes[+e.relatedTarget.id];
            if(smallBox.parent !== null) {
              this.props.removeChild(smallBox.parent, smallBox.id);
              this.props.removeParent(smallBox.id);
            }
            this.props.setParent(+e.target.id, smallBox.id);
            if(!this.props.children.includes(smallBox.id)){
              this.props.addChild(+e.target.id, smallBox.id);
            }
          }
      })
      .on('doubletap', (e) => {
        this.props.boxCopier(+e.target.id);
      })
  }

  updateBox = (updates) => {
    const newBox = Object.assign({
      id: +this.props.id,
      x: this.props.x,
      y: this.props.y,
      width: this.props.width,
      height: this.props.height,
      children: this.props.children,
      parent: this.props.parent,
      tag: this.props.tag,
      css: this.props.css,
    }, updates);

    this.props.setBox(newBox);
  }

  render() {
    let typeClass;
    switch(this.props.tag){
      case('div'): typeClass = 'basicBox'; break;
      case('p'): typeClass = 'paragraph'; break;
      case('h1'): typeClass = 'headerH1'; break;
      case('h2'): typeClass = 'headerH2'; break;
      case('h3'): typeClass = 'headerH3'; break;
      case('h4'): typeClass = 'headerH4'; break;
      case('h5'): typeClass = 'headerH5'; break;
      case('ul'): typeClass = 'ului'; break;
      case('img'): typeClass = 'img'; break;
      default: typeClass = 'basicBox'; break;
    }

    return (
      <rect className={`dropzone yes-drop ${typeClass}`} id={+this.props.id} height={this.props.height} width={this.props.width} x={this.props.x} y={this.props.y} rx="2px" ry="2px" />
    )
  }
}

export default Grid;
