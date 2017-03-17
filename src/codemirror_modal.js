import React from 'react';
import {Modal, Tooltip, Button, OverlayTrigger, Popover,} from 'react-bootstrap';
import {connect} from 'react-redux';
import Code from './Codemirror';
import './App.css';
import {htmlCreator,createCss} from './reducers/boxes'
const mapStateToProps =(state) => ({
  html: state.html,
  elements: state.boxes
})
const mapDispatchToProps = dispatch => ({
  submitHtml(elements){
    dispatch(htmlCreator(elements))
    dispatch(createCss()) //not sure what to pass in yet, default css 
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
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={()=>{
            this.props.submitHtml(this.props.elements);
          this.open()}}
        >
          Display Code
        </Button>

        <Modal dialogClassName="custom-modal" bsSize="large" show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Code Output</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Here is your custom HTML!</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <h4>Popover in a modal</h4>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

            <h4>Tooltips in a modal</h4>
            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

            <hr />

            <Code htmlString={'//HTML\n\n'+this.props.html.html}/>
            <Code htmlString={this.props.html.css} />

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(CodeModal);




