import React, { Component } from 'react';
import { addPage } from '../constants_actioncreators/groups';
import {addToGroup} from '../constants_actioncreators/layout';
import {connect} from 'react-redux';


const mapSTP = (state) => ({
  currentId: state.get('pages').get('currentPage'),
  elements: state.get('boxes').toJS(),
  groupId: state.get('pages').get('group'),
})

const mapDTP = (dispatch) => ({
  addGroup(stateCopy, groupId, currentId) {
    dispatch(addToGroup(stateCopy, groupId, currentId))
  }
})
const PageTabs = (props) => {
  //console.log(action);
  console.log(props, 'here props')

  //later form will be a map that responds to state and actions

    return (
              <div>
                <button className="fakeTab active bkoffwhite TrendHandMade borders">Page </button>
                <button className="fakeTab TrendHandMade other borders" onClick={() => {props.addGroup(props.elements, props.groupId, props.currentId)}}> Add Page +</button>
                <button className="fakeTab TrendHandMade other borders">Previous Page</button>
                <button className="fakeTab TrendHandMade other borders">Next Page</button>
              </div>
    )

}

export default connect(mapSTP, mapDTP)(PageTabs);
