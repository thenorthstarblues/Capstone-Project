import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

const snapGrid = { targets: [interact.createSnapGrid({ x: 10, y: 10 })], }

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
      .on('dragend', (event) => {
        this.checkForChanges(event);
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
      .on('resizeend', (event) => {
        this.checkForChanges(event);
      })
      .dropzone({
        ondrop: (e) => {
          this.props.removeParent(e.relatedTarget.id);
          this.addParentChild(e.target.id, e.relatedTarget.id);
        }
      });
  }

  removeParentChild = (parent, child) => {
    this.props.removeParent(+child);
    this.props.removeChild(+parent, +child);
  }

  addParentChild = (parent, child) => {
    this.props.setParent(+child, +parent);
    this.props.addChild(+child, +parent);
  }

  isInsideOfXs = (smallBox, bigBox) => {
    return smallBox.x >= bigBox.x && smallBox.x <= (bigBox.x + bigBox.width)
  }

  isInsideOfYs = (smallBox, bigBox) => {
    return smallBox.y >= bigBox.y && smallBox.y <= (bigBox.y + bigBox.height)
  }

  isOutsideOfXs = (smallBox, bigBox) => {
    return smallBox.x < bigBox.x || smallBox.x > (bigBox.x + bigBox.width)
  }

  isOutsideOfYs = (smallBox, bigBox) => {
    return smallBox.y < bigBox.y || smallBox.y > (bigBox.y + bigBox.height)
  }

  hasChildren = () => {
    return !!this.props.children.length;
  }

  hasNewChildren = () => {
    const allBoxes = this.props.boxes;
    Object.keys(allBoxes).forEach(boxId => {
      if (+boxId !== this.props.id){
        if (this.isInsideOfXs(allBoxes[+boxId], this.props) && this.isInsideOfYs(allBoxes[+boxId]), this.props){
          const prevParent = allBoxes[+boxId].parent ? allBoxes[+boxId].parent : 0;
          this.removeParentChild(prevParent, +boxId);
          this.addParentChild(this.props.id, +boxId);
        }
      }
    })
  }

  lostChildren = () => {
    const allBoxes = this.props.boxes;
    if(this.hasChildren()){
      this.props.children.forEach(boxId => {
        if (+boxId !== this.props.id){
          if (this.isOutsideOfXs(allBoxes[boxId], this.props) || this.isOutsideOfYs(allBoxes[+boxId], this.props)){
            this.removeParentChild(this.props.id, boxId);
          }
        }
      })
    }
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

  checkForChanges = () => {
    this.lostChildren();
    this.hasNewChildren();
  }


  render() {
    let typeClass;
    switch(this.props.tag){
      case('div'): typeClass = 'basicBox'; break;
      case('h1'): typeClass = 'basicH1'; break;
      case('img'): typeClass = 'basicImg'; break;
      default: typeClass = 'basicBox'; break;
    }

    return (
      <rect className={`dropzone yes-drop ${typeClass}`} id={+this.props.id} height={this.props.height} width={this.props.width} x={this.props.x} y={this.props.y} rx="2px" ry="2px" />
    )
  }
}

export default Grid;
