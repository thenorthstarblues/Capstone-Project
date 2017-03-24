import React, { Component } from 'react';

//add/use connect to dispatch eventually to state/css updates

class FontColor extends Component{
  constructor(props){
    super(props);
    this.state= {
      colorsPicked:[], //to add to Css... need to make reducers/incorporate
      headerFont:'',
      paragraphFont:'',

    }
    //add actions/bind here

  }

    render(){

    return (
            <div className="fontOptions bkoffwhite row flexRow spaceAround border1 centerAround">
                    <div >
                          <p className="TrendHandMade closer">other options</p>
                          <p className="small">to include in css classes</p>
                    </div>
                    <div >
                      <form onChange="">
                        <select name="headers" className="bkwhite" >
                            <option value="volvo">google header font options</option>
                          </select>
                          <p className="small">sample</p>
                      </form>
                    </div>
                    <div >
                      <form onChange="">
                        <select name="paragraphs" className="bkwhite" >
                            <option value="volvo">google paragraph font options</option>
                          </select>
                          <p className="small">sample</p>
                      </form>
                    </div>
                    <div >
                      <form onChange="">
                        <button className="btn btn-default">choose up to 6 pallet colors</button>
                      </form>
                    </div>
                    <div className="colorBox">
                      box
                    </div>
                    <div className="colorBox">
                      box
                    </div>
                    <div className="colorBox">
                      box
                    </div>
                    <div className="colorBox">
                      box
                    </div>
                    <div className="colorBox">
                      box
                    </div>
              </div>
    )
  }

}

export default FontColor;
