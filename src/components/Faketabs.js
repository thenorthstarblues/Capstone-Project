import React, { Component } from 'react';
import { addPage, saveOrUpdate, setCurrent } from '../constants_actioncreators/groups';
import {addToGroup, loadLayout} from '../constants_actioncreators/layout';
import {connect} from 'react-redux';



const mapSTP = (state) => ({
  currentId: state.get('pages').get('currentPage'),
  elements: state.get('boxes').toJS(),
  groupId: state.get('pages').get('group'),
  pages: state.get('pages').get('pages')
})

const mapDTP = (dispatch) => ({
  addGroup(stateCopy, groupId, currentId) {
    dispatch(addToGroup(stateCopy, groupId, currentId))
  },
  changePage(elements, currentId, pageNo){
    console.log()
    dispatch(saveOrUpdate(elements, currentId));
    dispatch(loadLayout(pageNo));
    dispatch(setCurrent(pageNo));
  }

})
const PageTabs = (props) => {
  const pageArr = props.pages;

    return ( <div>
                <button className="fakeTab TrendHandMade other borders" onClick={() => {props.addGroup(props.elements, props.groupId, props.currentId)}}> Add Page +</button>
              { pageArr.map((page)=>{
                return (<button onClick={()=>{props.changePage(props.elements, props.currentId, page) }}key={page} className="fakeTab active bkoffwhite TrendHandMade borders">Page {page}</button>)
              }) } 

                <button className="fakeTab TrendHandMade other borders">Previous Page</button>
                <button className="fakeTab TrendHandMade other borders">Next Page</button>
              </div>
    )

}

export default connect(mapSTP, mapDTP)(PageTabs);
