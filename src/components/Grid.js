import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

const snapGrid = { targets: [interact.createSnapGrid({ x: 7, y: 7 })], }

const typeClass={
    div: 'basicBox',
    p: 'paragraph svgP',
    h1: 'headerH1 svgP',
    h2: 'headerH2 svgP',
    h3: 'headerH3 svgP',
    h4: 'headerH4 svgP',
    h5: 'headerH5 svgP',
    ul: 'ului svgP',
    table: 'table1 svgP',
    img: 'img svgP',
    video: 'video svgP',
    audio: 'audio svgP',
    button: 'buttn svgP',
    text: 'textForm svgP',
    radio: 'radioForm svgP',
    file: 'fileForm svgP',
    options: 'optionsForm svgP',
}

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

    // should only effect the preview coloring
    let newClass='norm'; //leave undefined for no effect
    if (this.props.id && this.props.id>100){
      newClass='hierarchyDiv';
    }

    return (
      <rect className={`dropzone yes-drop ${typeClass[this.props.tag]} ${newClass}`} id={+this.props.id} height={this.props.height} width={this.props.width} x={this.props.x} y={this.props.y} rx="2px" ry="2px" />
    )
  }
}

export default Grid;

