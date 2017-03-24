import React, {Component} from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import {saveGroup} from '../reducers/boxes';
import {connect} from 'react-redux';


const mdtp = (dispatch) => {
    return {
        addGroup(name, currentId){ return dispatch(saveGroup(name, currentId))
        }
    }
}

class bottomButtons extends Component {

    render(){
    return (
        <div>
            <Button onClick={ ()=> this.props.addGroup('testName', 1)} >add page</Button>
            <Button > page1</Button>
            <Button > page2</Button>
        </div>

    )
    }
}

export default connect(null, mdtp)(bottomButtons);
