import React, { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import Navigation from './Navigations';
import ViewGroups from './ViewGroups';
import { getTemplates, setCurrent, makeGroup, getLayouts } from '../constants_actioncreators/groups';
import { loadLayout } from '../constants_actioncreators/layout';
import '../style/css/App.css';

const mapStateToProps = (state) => ({
    boxes: state.get('boxes').toJS(),
    pages: state.get('pages').get('pages'),
    groups: state.get('pages').get('groups'),
    currentGroup: state.get('pages').get('group'),
});

const mapDispatchToProps = dispatch => ({
  onTemplateEnter() {
    dispatch(getTemplates());
  },
  loadSelected(id) {
    dispatch(loadLayout(id));
    dispatch(setCurrent(id));
  },
  loadLayouts(id) {
    dispatch(getLayouts(id));
    dispatch(makeGroup(id));
  },
});

class Templates extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.onTemplateEnter();
  }

  render() {
    return (
      <div className="App bkgrey">
        <div className="container-fluid ">
          <Navigation page="templates" />
          <ViewGroups
            pages={this.props.pages}
            groups={this.props.groups}
            loadSelected={this.props.loadSelected}
            loadLayouts={this.props.loadLayouts}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
