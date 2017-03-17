import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';


class TrashCan extends Component {
  constructor(props) {
    super(props);
    this.onDrop=this.onDrop.bind(this);
  }

  componentDidMount() {
    interact(ReactDOM.findDOMNode(this))
      .dropzone({
        ondrop: this.onDrop,
        ondragleave: this.onLeave,
      })
  }

  onDrop = (e) => {
    console.log(e.relatedTarget.id + ' was trashed ');
    this.props.removeBox(+e.relatedTarget.id);
  }

  render() {

    return (
        <div className="trash">
          <span className="glyphicon glyphicon-trash"></span>
        </div>
    )
  }
}

export default TrashCan;
