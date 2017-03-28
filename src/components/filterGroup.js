import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SvgThumb} from './FamilyScroll'

const FilterForm = (props) => {
  const handleChange = props.handleChange;
  const inputValue = props.inputValue;

  return (
    <form className="form-group" style={{ marginTop: '20px' }}>
      <input
        onChange={handleChange}
        value={inputValue}
        className="form-control"
        placeholder="Enter group name"
      />
    </form>
  );
};


const mapStateToProps = (state) => {
  const groups = state.get('pages').get('groups');
  const layouts = state.get('pages').get('pages');
  console.log(state);
  console.log(groups);
  return {
    groups: groups,
    layouts: layouts,
  };
};

export default connect(mapStateToProps)(class extends Component {
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
        <div className="sideThumbs">
          {
            filteredGroup && filteredGroup.map(group => (
                <div key={group.id} onClick="">
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
    );
  }
});
