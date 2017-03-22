import React from 'react';
import {Modal, Tooltip, Button, OverlayTrigger, Popover,} from 'react-bootstrap';
import {connect} from 'react-redux';
import Code from './Codemirror';
import '../style/css/App.css';
import {saveLayout, loadLayout} from '../reducers/boxes';
import { htmlCreator, createCss} from '../reducers/html';
import { findSiblings } from '../reducers/siblingReducer2';

const mapStateToProps =(state) => ({
  html: state.html,
  //elements: state.boxes
  boxes: state.boxes,
  boxesCss: state.sibling.boxesCss,
})

//TODO: dispatch doesnt work for save layout
const mapDispatchToProps = dispatch => ({
  findSiblings(boxes){
    console.log('testing deep copy');
    dispatch(findSiblings(boxes));
    //dispatch(createCss()) //not sure what to pass in yet, default css
  },
  submitHtml(boxes){
    dispatch(htmlCreator(boxes))
    //dispatch(createCss()) //not sure what to pass in yet, default css
  },
  save(name, boxes){
    dispatch(saveLayout(name, boxes))
  },
  load(id){
    dispatch(loadLayout(id))
  }
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

    const stateCopy = Object.assign({}, this.props.boxes)
    // const popover = (
    //   <Popover id="modal-popover" title="popover">
    //     very popover. such engagement
    //   </Popover>
    // );
    // const tooltip = (
    //   <Tooltip id="modal-tooltip">
    //     wow.
    //   </Tooltip>
    // );
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
            {/*<h4>Here is your custom HTML!</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

            <h4>Popover in a modal</h4>
            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

            <h4>Tooltips in a modal</h4>
            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

            <hr />*/}

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

export default connect(mapStateToProps,mapDispatchToProps)(CodeModal);




