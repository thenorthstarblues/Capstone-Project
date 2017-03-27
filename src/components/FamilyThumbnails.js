import React, { Component } from 'react';
import { SvgThumb } from './FamilyScroll';
import { Link } from 'react-router-dom';

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
];




const FamilyThumbnails= (({clickHandle, groups,action})=> {
  //console.log(action);

    return (
              <div className="addOptionsInt">
                <div className="border1">
                <p className="closer"><span className="TrendHandMade">CLICK THUMBNAILS TO EDIT:</span> load templates into editing tabs</p>
                <div className="mainThumbs flexWrap left">
                  {groups.map(button=>{ //later this should link to the state and the dispatch calls to sort/select
                    return (<Link to="/">
                              <div onClick = {()=> clickHandle(button)}className="thumbnailMargLarge">
                                <SvgThumb scale="" actions="" classThis="" value="1" vers="large" />
                              </div>
                            </Link>
                            )
                  })}
                </div>
                <p className="closer"><span className="TrendHandMade">NUMBER OF VARIATIONS:</span> count of group elements loaded</p>
                </div>
            </div>
    )

})

export default FamilyThumbnails;
