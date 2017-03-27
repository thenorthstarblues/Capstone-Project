import React from 'react';
import { SvgThumb } from './SvgThumb';


const FamilyScroll = (({ groups, loadLayouts }) => (
    <div className="addOptionsInt">
      <div className="border1">
        <p className="closer">
          <span className="TrendHandMade">SEARCH:</span>
           find group by name
        </p>
        <form onClick="">
          <input />
          <br />
          <button className="btn btn-default btn-sm m5w bshadsm" type="submit" >
            <span className="glyphicon glyphicon-search" />
              search
          </button>
        </form>
      </div>
      <div className="border1">
        <p className="closer">
          <span className="TrendHandMade">CLICK GROUP:</span>
          to view & select children
        </p>
        <div className="sideThumbs">
          {
            groups && groups.map(group => (
              <div key={group.id}>
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
  groups: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default FamilyScroll;
