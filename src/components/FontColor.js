import React, { Component } from 'react';
import {connect} from 'react-redux';
//core actions
import Immutable from 'immutable';

import { clearAll } from '../constants_actioncreators/boxes';


const mapStateToProps = (state) => { // just need general directions to create css at start of file, in advance of additional categories
  return {
    boxes: state.get('boxes').toJS(),
    boxesCss: state.get('sibling'),
    html: state.get('css'),
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    clearAll(){
      dispatch(clearAll())
    },
  }
}



class FontColor extends Component{
  constructor(props){
    super(props);
    this.state= {
      colorsPicked:[],
      headerFont:'',
      paragraphFont:'',

    }
    this.pickColor=this.pickColor.bind(this);
    this.pickHeader=this.pickHeader.bind(this);
    this.pickParagraph=this.pickParagraph.bind(this);

  }

  pickColor=((e)=>{
    // add in the js color picker here for the final workflow- npm install
    console.log(e.target);

  })

  pickHeader=((e)=>{
    // add in the js color picker here for the final workflow- npm install
    console.log(e.target);

  })

  pickParagraph=((e)=>{
    // add in the js color picker here for the final workflow- npm install
    console.log(e.target);

  })


    render(){

    return (
            <div className="fontOptions bkoffwhite row border1">
              <div className="col-lg-10 row">
                    <div className="col-lg-2">
                          <p className="TrendHandMade closer">other options</p>
                          <p className="small">to include in css classes</p>
                    </div>
                    <div className="col-lg-3">
                      <form onChange="">
                        <select name="headers" className="bkwhite" >
                            <option value="volvo">google header font options</option>
                          </select>
                          <p className="small">sample</p>
                      </form>
                    </div>
                    <div className="col-lg-3">
                      <form onChange="">
                        <select name="paragraphs" className="bkwhite" >
                            <option value="volvo">google paragraph font options</option>
                          </select>
                          <p className="small">sample</p>
                      </form>
                    </div>
                    <div className="col-lg-2">
                      <form onChange="">
                        <button className="btn btn-default btn-sm" onClick="" >pick pallet color</button>
                      </form>
                    </div>
                    <div className="col-lg-3">
                    {/*this.colorsPicks.map((color, i)=>{
                      if (i < 6) { // this should be in hex format from the picker.
                        return (
                                <div className="colorBox" style={`background-color: ${color}`}>
                                  {color}
                                </div>
                              );
                      }
                    })*/}
                    </div>
                  </div>
                  <div className="col-lg-2 block-center text-center">

                    <button className="btn btn-default btn-sm clearBtn" onClick={this.props.clearAll} ><span className="TrendHandMade closer">clear layout</span></button>

                  </div>
              </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(FontColor);
