import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Code from './Codemirror';
import '../style/css/App.css';
import { saveLayout, loadLayout } from '../constants_actioncreators/layout';
import { htmlCreator, createCss } from '../reducers/html';
import { findSiblings } from '../reducers/siblings';
import { saveOrUpdate } from '../constants_actioncreators/groups';

const mapStateToProps = state => ({
  html: state.get('html').toJS(),
  elements: state.get('boxes').toJS(),
  boxesCss: state.get('boxesCss').toJS(),
  currentId: state.get('pages').get('currentPage'),
});


const mapDispatchToProps = dispatch => ({
  findSiblings(elements) {
    dispatch(findSiblings(elements));
  },
  save(elements, id) {
    dispatch(saveOrUpdate(elements, id));
  },
  load(id) {
    dispatch(loadLayout(id));
  },
});


// TODO: convert modal to dumb component
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
    const stateCopy = this.props.elements;
    return (
      <div className="flexWrap">

        <Button
          bsStyle="default"
          bsSize="small"
          onClick={()=>{
            this.props.findSiblings(stateCopy);
            this.open();
          }}

        >
          Display Code
        </Button>
        <Modal dialogClassName="custom-modal" bsSize="large" show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Code Output</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Code htmlString={`//HTML\n\n${this.props.html.html}`} />
            <Code htmlString={this.props.html.css} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { this.props.load(1); }}>Load </Button>
            <Button>
          Download
          </Button>

            <Button
              onClick={() => {
              this.props.save(stateCopy, this.props.currentId);
            }}
            >SAVE </Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeModal);

