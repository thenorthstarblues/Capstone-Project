import React from 'react';
import {Modal, Tooltip, Button, OverlayTrigger, Popover,} from 'react-bootstrap';
import {connect} from 'react-redux';
import Code from './Codemirror';
import '../style/css/App.css';
import {saveLayout, loadLayout} from '../constants_actioncreators/layout';
// import { htmlCreator, createCss} from '../reducers/html';
import { findSiblings } from '../reducers/siblings';

const mapStateToProps = state => ({
  html: state.get('html').toJS(),
  elements: state.get('boxes').toJS(),
  boxesCss: state.get('boxesCss').toJS(),
});

const mapDispatchToProps = dispatch => ({
  findSiblings(elements) {
    dispatch(findSiblings(elements));
  },
  save(name, elements) {
    dispatch(saveLayout(name, elements));
  },
  load(id) {
    dispatch(loadLayout(id));
  },
});


//TODO: convert modal to dumb component
const CodeModal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    console.log(this.props.elements, 'this is what we are looking for');
    const stateCopy = this.props.elements;
    return (
      <div>
        <Button
          bsStyle="default"
          bsSize="sm"
          onClick={()=>{

            this.props.findSiblings(stateCopy);
            this.open()}}
        >
          Display Code
        </Button>
        <Modal dialogClassName="custom-modal" bsSize="large" show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Code Output</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Code htmlString={'//HTML\n\n'+this.props.html.html}/>
            <Code htmlString={this.props.html.css} />
          </Modal.Body>
          <Modal.Footer>
          <Button onClick={()=>{this.props.load(1)}}>Load </Button>
          <Button>
          Download
          </Button>
          <Button onClick={()=> {
             this.props.save('test',stateCopy)
            }}>SAVE </Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeModal);
