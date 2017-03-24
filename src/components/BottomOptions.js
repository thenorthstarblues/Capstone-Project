import React, { Component } from 'react';

const bars=[ //offset, width here, at scale
    [5, 940, 1440, '15" macbook'],
    [62, 816, 1224, 'general labtops'],
    [129, 682, 1024, 'tablets landscape'],
    [219, 512, 768, 'tablet portrait'],
    [253, 445, 682, 'smartphone landscape'],
];

const column=[
  [8,0],
  [75,14],
  [154,14],
  [233,14],
  [312,14],
  [391,14],
  [470,14],
  [549,14],
  [628,14],
  [707,14],
  [786,14],
  [865,14],
  [944,0],
];

class BottomOptions extends Component {
  constructor(props){
    super(props);
    this.state={
      active: 0,
      grid: false,
      columns: false,
      colStyle: 'Trenda',
      verticals: 0,
    }
    this.setFocus=this.setFocus.bind(this);
    this.isActive=this.isActive.bind(this);
    this.showCol=this.showCol.bind(this);

  }

  setFocus(e){
    e.preventDefault();
    let focus = e.target.attributes.value.value;
    this.setState({active: +focus});
    this.setState({verticals: +focus});
  }
  //screen break bar - click to show target width when composing

  isActive(val){
    if (this.state.active<=val){
      return 'activeBar';
    } else {
      return 'inactiveBar';
    }
  };

   showCol(e){
    e.preventDefault();
    let focus = e.target.attributes.value.value;
    (this.state.columns%2)? this.setState({columns: 0, colStyle: 'Trenda'}): this.setState({columns: 1, colStyle: 'TrendaActive'});
  };


  render(){




    return (
              <g> {/* this is just the dummy layout*/}
                {bars.map((bar, i)=>{
                  return (
                          <g>
                          <rect x={bar[0]} y="510" width={bar[1]} value={i} onClick={this.setFocus} className={`bshadsm ${this.isActive(i)}`} />

                          </g>
                    )
                })}
                {bars.map((bar, i)=>{
                  return (
                          <g>
                          <text x={bar[0]+5} y="523" textAnchor="start" className="textBar" >{bar[2]}</text>
                          <text x={bar[0]+bar[1]-5} y="523" textAnchor="end" className="textBar" >{bar[2]}</text>
                          </g>
                    )
                })}
                {this.state.verticals &&
                  bars.map((bar, i)=>{
                    if (this.state.verticals===i){
                    return (
                            <g>
                            <line x1={bar[0]} y1="2" x2={bar[0]} y2="499" className="verticalGuides" />
                            <line x1={bar[0]+bar[1]} y1="2" x2={bar[0]+bar[1]} y2="499" className="verticalGuides"  />

                            </g>
                      )
                  }
                })}
                  {this.state.columns &&
                  column.map((bar, i)=>{

                    return (
                            <g>
                            <line x1={bar[0]} y1="2" x2={bar[0]} y2="499" className="verticalGuides" strokeOpacity="0.5"/>
                            <line x1={bar[0]+bar[1]} y1="2" x2={bar[0]+bar[1]} y2="499" className="verticalGuides" strokeOpacity="0.5" />

                            </g>
                      )

                })}

                <text x="955" y="525" textAnchor="start" fontFamily="TrendHandMade" >MEDIA BREAK PTS</text>
                <text x="10" y="550" textAnchor="start" fontFamily="TrendHandMade" >VISUAL GUIDES</text>
                  <text x="200" y="550" onClick={this.showCol} value="1" className={this.state.colStyle}>show columns</text>
                  <text x="350" y="550" className="Trenda">show active offsets</text>

              </g>
    )
  }

};

export default BottomOptions;
