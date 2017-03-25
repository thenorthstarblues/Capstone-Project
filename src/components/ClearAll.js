import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

import { clearAll } from '../constants_actioncreators/boxes';

const mapDispatchToProps = (dispatch) => {
  return {
    clearAll(){
      dispatch(clearAll())
    },
  }
}

class ClearAll extends Component {

  render() {
    let x= 959, y= 460, width= 155, height= 40, x2= x+width, y2= y+height;

    return (
      <g>
          <rect x={x} y={y} width={width} height={height} rx="2px" ry="2px" className="btn btn-default clearBtn" onClick={this.props.clearAll} />
          <text x={x+width/2} y={y+25} textAnchor="middle" fontFamily="TrendHandMade" >CLEAR ALL</text>
      </g>
    )
  }
}

export default connect(null, mapDispatchToProps)(ClearAll);
