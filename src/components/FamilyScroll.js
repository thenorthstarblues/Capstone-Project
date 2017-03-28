import React, { Component } from 'react';
import FilterGroup from './filterGroup';


export const SvgThumb = (({ groupName, groupId, vers }) => {
  let width = 190;
  let height = 100;
  if (vers === 'large') {
    width *= 1.95;
    height *= 1.95;
  }

  return (
    <div className="thumbSpace">
      <svg width={width} height={height} >
        <rect x="0" y="0" width={width} height={height} className="bkRect" />
        <text x="5" y="50" textAnchor="start">{ groupName }</text>
        <rect x="0" y="0" width={width} height={height} className="activeRect" value="" />
      </svg>
    </div>


  );
});

SvgThumb.propTypes = {
  groupName: React.PropTypes.string.isRequired,
  groupId: React.PropTypes.number.isRequired,
  vers: React.PropTypes.string.isRequired,
};


const FamilyScroll = (({clickAdd, groups }) => (
    <div className="addOptionsInt">
      <div className="border1">
        <p className="closer">
          <span className="TrendHandMade">SEARCH:</span>
           find group by name
        </p>
        <FilterGroup />
      </div>
      <div className="border1">
        <p className="closer">
          <span className="TrendHandMade">CLICK GROUP:</span>
          to view & select children
        </p>
        <div className="sideThumbs">
          {
            groups && groups.map(group => (
                <div key={group.id} onClick={()=> clickAdd(group.id)}>
                  <SvgThumb
                    groupName={group.name}
                    groupId={group.id}
                    vers="small"
                  />
                </div>
              ),
            )
          }
        </div>
        <p className="closer">
          <span className="TrendHandMade">OTHER:</span>
           additional search options</p>
        <p>or comments on contents being loaded</p>
      </div>
    </div>
  ));

FamilyScroll.propTypes = {
  groups: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default FamilyScroll;
