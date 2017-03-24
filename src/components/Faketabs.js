import React, { Component } from 'react';

const Faketabs = (({state, action})=> {
  //console.log(action);

  //later form will be a map that responds to state and actions

    return (
              <div>
                <button className="fakeTab active bkoffwhite TrendHandMade borders">group1</button>
                <button className="fakeTab TrendHandMade other borders"> other options</button>
                <button className="fakeTab TrendHandMade other borders">other options</button>
                <button className="fakeTab TrendHandMade other borders">other options</button>
              </div>
    )

})

export default Faketabs;
