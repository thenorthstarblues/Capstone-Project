import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveGroup } from '../constants_actioncreators/layout';

const mstp = state => ({
  currentId: state.get('pages').get('currentPage'),
  elements: state.get('boxes').toJS(),
  group: state.get('pages').get('group'),

});

const mdtp = dispatch => ({
  save(name, currentId) {
    dispatch(saveGroup(name, currentId));
  },
});

class GroupForm extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {

  }

  render() {
    return (
      <form name="groupName" onClick="">
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <button className="btn btn-default btn-sm m5w bshadsm" value="" type="button" onClick={(event) => {
            console.log(this.state);
            console.log(event);
            console.log(this.props)
            this.props.save(this.state.value, this.props.currentId)}}
            ><span className="glyphicon glyphicon-ok" />  new</button>
          <button className="btn btn-default btn-sm m5w bshadsm" value="" ><span className="glyphicon glyphicon-plus" />  var</button>
          <button className="btn btn-default btn-sm m5w bshadsm" value="" ><span className="glyphicon glyphicon-minus" />  var</button>
        </form>
    );
  }
}

export default connect(mstp, mdtp)(GroupForm);