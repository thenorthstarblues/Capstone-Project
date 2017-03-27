import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Code from './Codemirror';
import '../style/css/App.css';
import { loadLayout } from '../constants_actioncreators/layout';
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


class CodeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const stateCopy = this.props.elements;
    return (
      <div className="flexWrap">

        <Button
          bsStyle="default"
          bsSize="small"
          onClick={() => {
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
            <hr />
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
  }
}

CodeModal.propTypes = {
  elements: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
  findSiblings: React.PropTypes.func.isRequired,
  save: React.PropTypes.func.isRequired,
  currentId: React.PropTypes.number.isRequired,
  load: React.PropTypes.func.isRequired,
  html: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeModal);

