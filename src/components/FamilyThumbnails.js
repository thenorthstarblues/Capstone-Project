import React, { Component } from 'react';
import { SvgThumb } from './FamilyScroll';
import { Link } from 'react-router-dom';


const FamilyThumbnails= (({clickHandle, groups, groupLayouts, action})=> {
  console.log('the groups',groups);

    return (
              <div className="addOptionsInt">
                <div className="border1">
                <p className="closer"><span className="TrendHandMade">CLICK THUMBNAILS TO EDIT:</span> load templates into editor</p>
                <div className="mainThumbs flexWrap left">
                  {groups.map((button, i)=>{ //later this should link to the state and the dispatch calls to sort/select
                    return (<Link to="/">
                              <div onClick = {()=> clickHandle(button)} className="thumbnailMargLarge">
                                <SvgThumb elements={groupLayouts[i]} value="1" vers="large" />
                              </div>
                            </Link>
                            )
                  })}
                </div>
                <p className="closer"><span className="TrendHandMade">GROUP VARIATIONS ABOVE</span></p>
                </div>
            </div>
    )

})

export default FamilyThumbnails;
