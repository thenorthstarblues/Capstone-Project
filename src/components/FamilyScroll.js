import React, { Component } from 'react';
import FilterGroup from './filterGroup';


export const SvgThumb = (({ groupName, groupId, vers, elements }) => {
  let width = 190;
  let height = 100;
  let scale=0.2;
  if (vers === 'large') {
    width *= 1.95;
    height *= 1.95;
    scale *= 1.95;
  }


  return (
    <div className="thumbSpace">
      <svg width={width} height={height} >
        <rect x="0" y="0" width={width} height={height} className="bkRect" />
        <text x="5" y="50" textAnchor="start">{ groupName }</text>
        <rect x="0" y="0" width={width} height={height} className="activeRect" value="" />
        {elements &&
          elements.map((element, i)=>{
            return (
              <rect key={element.x+'i'} x={element.x*scale} y={element.y*scale} width={element.width*scale} height={element.height*scale} className="thinLine" />
            )
          })
        }
      </svg>
    </div>


  );
});

SvgThumb.propTypes = {
  groupName: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.number.isRequired,
  vers: React.PropTypes.string.isRequired,
};


const FamilyScroll = (({ groups }) => (
    <div className="addOptionsInt">
      <FilterGroup />
    </div>
  ));

FamilyScroll.propTypes = {
  groups: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default FamilyScroll;
