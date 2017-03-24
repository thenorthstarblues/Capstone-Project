import React, { Component } from 'react';

const FontColor = (({action})=> {
  //console.log(action);

    return (
            <div className="fontOptions bkoffwhite row flexRow spaceBetween border1">
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
                    <div className="colorBox">
                      box
                    </div>
                    <div className="colorBox">
                      box
                    </div>
              </div>
    )

})

export default FontColor;
