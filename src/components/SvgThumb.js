import React from 'react';

const SvgThumb = (({ groupName, groupId, vers, pageNum }) => {
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
        <text x="5" y="50" textAnchor="start">
          { vers === 'small' ? groupName : pageNum }
        </text>
        <rect x="0" y="0" width={width} height={height} className="activeRect" value="" />
      </svg>
    </div>
  );
});

SvgThumb.propTypes = {
  groupName: React.PropTypes.string,
  groupId: React.PropTypes.number,
  vers: React.PropTypes.string.isRequired,
  pageNum: React.PropTypes.number,
};

export default SvgThumb;
