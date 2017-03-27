import React from 'react';
import { Link } from 'react-router-dom';
import { SvgThumb } from './SvgThumb';


const FamilyThumbnails = (({ pages, loadSelected }) => (
    <div className="addOptionsInt">
      <div className="border1">
        <p className="closer">
          <span className="TrendHandMade">CLICK THUMBNAILS TO EDIT:</span>
          load templates into editing tabs
        </p>
        <div className="mainThumbs flexWrap left">
          {
            pages && pages.map(page => (
              <Link to="/">
                <div className="thumbnailMargLarge">
                  <SvgThumb
                    vers="large"
                    pageNum={page}
                  />
                </div>
              </Link>
              ),
            )
          }
        </div>
        <p className="closer">
          <span className="TrendHandMade">NUMBER OF VARIATIONS:</span>
           count of group elements loaded
        </p>
      </div>
    </div>
  )
);

FamilyThumbnails.propTypes = {
  pages: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  loadSelected: React.PropTypes.func.isRequired,
};

export default FamilyThumbnails;
