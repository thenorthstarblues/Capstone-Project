import React, { Component } from 'react';

let buttons= [
  {
    val: 'div',
    icon: 'glyphicon glyphicon-unchecked',
    style: '',
  },
  {
    val: 'p',
    icon: 'glyphicon glyphicon-align-left',
    style: 'text-left',
  },
  {
    val: 'p',
    icon: 'glyphicon glyphicon-align-center',
    style: 'text-center',
  },
  {
    val: 'p',
    icon: 'glyphicon glyphicon-align-right',
    style: 'text-right',
  },
  {
    val: 'h1',
    icon: 'glyphicon glyphicon-plus',
    style: '',
  },
  {
    val: 'h2',
    icon: 'glyphicon glyphicon-align-left',
    style: '',
  },
  {
    val: 'h3',
    icon: 'glyphicon glyphicon-align-center',
    style: '',
  },
  {
    val: 'h4',
    icon: 'glyphicon glyphicon-align-right',
    style: '',
  },
  {
    val: 'h5',
    icon: 'glyphicon glyphicon-align-right',
    style: '',
  },
  {
    val: 'ul',
    icon: 'glyphicon glyphicon-th-list',
    style: '',
  },
  {
    val: 'table',
    icon: 'glyphicon glyphicon-th',
    style: '',
  },
  {
    val: 'img',
    icon: 'glyphicon glyphicon-picture',
    style: '',
  },
  {
    val: 'video',
    icon: 'glyphicon glyphicon-align-right',
    style: '',
  },
  {
    val: 'audio',
    icon: 'glyphicon glyphicon-align-right',
    style: '',
  },
  {
    val: 'button',
    icon: 'glyphicon glyphicon-align-right',
    style: '',
  },
];

export const SvgThumb = (({scale, actions, classThis,value, vers})=>{
  //whatelse will we want to pass in for the transform
  //interactive links on the transparent layer, atop the scaled svg

  let width=190;
  let height=100;
  if (vers==='large'){
    width*=1.95;
    height*=1.95;
  }


  return (
      <div className="thumbSpace">
        <svg width={width} height={height} >
          <rect x="0" y="0" width={width} height={height} className="bkRect" />
            <text x="5" y="50" textAnchor="start">Svg's will load here</text>
          <rect x="0" y="0" width={width} height={height} className="activeRect" value=""/>
        </svg>
      </div>


  );

})



const FamilyScroll = (({groups, action, clickAdd})=> {
  console.log(groups);

    return (
              <div className="addOptionsInt">
                <div className="border1">
                  <p className="closer"><span className="TrendHandMade">SEARCH:</span> find group by name</p>
                  <form onClick="">
                    <input></input>
                    <br/>
                    <button className="btn btn-default btn-sm m5w bshadsm" type="submit" ><span className="glyphicon glyphicon-search"></span>  search</button>
                  </form>
                </div>
                <div className="border1">
                <p className="closer"><span className="TrendHandMade">CLICK GROUP:</span> to view & select children</p>
                <div className="sideThumbs">
                  {groups.map(button=>{ //later this should link to the state and the dispatch calls to sort/select
                    console.log(button);
                    return (
                      <div onClick={()=>clickAdd(button)}>
                      <SvgThumb scale="" actions="" classThis="" value="" vers="small"  />
                      </div>
                            )
                  })}
                </div>
                <p className="closer"><span className="TrendHandMade">OTHER:</span> additional search options</p>
                <p>or comments on contents being loaded</p>

                </div>
            </div>
    )

})

export default FamilyScroll;
