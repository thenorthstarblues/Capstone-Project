import React, { Component } from 'react';
import {SvgThumb} from './FamilyScroll';

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




const FamilyThumbnails= (({action})=> {
  //console.log(action);

    return (
              <div className="addOptionsInt">
                <div className="border1">
                <p className="closer"><span className="TrendHandMade">CLICK THUMBNAILS TO EDIT:</span> load templates into editing tabs</p>
                <div className="mainThumbs flexWrap left">
                  {buttons.map(button=>{ //later this should link to the state and the dispatch calls to sort/select
                    return (
                            <div className="thumbnailMargLarge">
                              <SvgThumb scale="" actions="" classThis="" value="" vers="large" />
                            </div>
                            )
                  })}
                </div>
                <p className="closer"><span className="TrendHandMade">NUMBER OF VARIATIONS:</span> count of group elements loaded</p>
                </div>
            </div>
    )

})

export default FamilyThumbnails;
