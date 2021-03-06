import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SvgThumb} from './FamilyScroll'
import {getLayouts} from '../constants_actioncreators/groups'
const FilterForm = (props) => {
  const handleChange = props.handleChange;
  const inputValue = props.inputValue;

  return (
    <div className="border1">
       <p className="closer">
      <span className="TrendHandMade">SEARCH:</span>
           find group by name
        </p>
      <form className="form-group" style={{ marginTop: '20px' }}>
      <input
        onChange={handleChange}
        value={inputValue}
        className="form-control"
        placeholder="Enter group name"
      />
    </form>
      </div>
  );
};


const mapStateToProps = (state) => {
  const groups = state.get('pages').get('groups').toJS();
  const layouts = state.get('pages').get('pages');
  return {
    groups,
    layouts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    load(id) {
      dispatch(getLayouts(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const inputValue = evt.target.value;
    this.setState({ inputValue });
  }

  render() {
    const inputValue = this.state.inputValue;
    console.log(this.state)
    var  filteredGroup = this.props.groups.filter(group => group.name.match(inputValue));

    return (
      <div>
        <FilterForm handleChange={this.handleChange} inputValue={inputValue} />
        <div className="sideThumbs border1">
         <div className="">
          <p className="closer">
          <span className="TrendHandMade">CLICK GROUP:</span>
          to view & select children
        </p>
        <div >
        {
            filteredGroup && filteredGroup.map(group => (
                <div key={group.id} onClick={()=>{
                  console.log('hihihi'); this.props.load(group.id)}}>
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
        </div>
        </div>
        </div>
    );
  }
});

