import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import interact from 'interact.js';

const ButtonReg = ({action, x, y, value, style, format})=> {

  return (
        <g>
          <rect x={x} y={y} width="70" height="30" value={value} data={style} className="adds" onClick={action} />
          <text x={x+8} y={y+22} textAnchor="start" className="icons " >{format}</text>
          <text x={x+32} y={y+20} textAnchor="start" className="small" >{value}</text>
        </g>
        )
}

const ButtonH = ({action, x, y, value, style, format})=> {

  return (
          <g>
            <rect x={x} y={y} width="45" height="30" className="adds " onClick={action} value={value} data={style} />
            <text x={x+8} y={y+22} textAnchor="start" className="iconsH " >{format}</text>
            <text x={x+25} y={y+20} textAnchor="start" className="small" >{value}</text>
          </g>
        );
}

const ButtonSm = ({action, x, y, value, style, format})=> {

  return (
          <g>
            <rect x={x} y={y} width="45" height="30" className="adds " onClick={action} value={value} data={style} />
            <text x={x+8} y={y+22} textAnchor="start" className="icons " >{format}</text>
            <text x={x+28} y={y+20} textAnchor="start" className="small" >{value}</text>
          </g>
        );
}


const AddOptions = (({action})=> {
  //console.log(action);
  let yVal = 70;
  let xVal = 1100;
  let xVal2 = 1180;

    return (
              <g> {/* this is just the dummy layout, buttons up here */}
                <text x={xVal} y="20" textAnchor="start">CLICK: to add element</text>
                  <rect x={xVal} y="25" width="150" height="1" className="adds" />

                  <ButtonReg x={xVal} y={yVal-25} value="div" action={action} style="" format="&#xe157;" />

                    <ButtonSm x={xVal} y={yVal+15} value="p" style="text-left" format="&#xe052;" action={action} />
                    <ButtonSm x={xVal+50} y={yVal+15} value="p" style="text-center" format="&#xe053;" action={action} />
                    <ButtonSm x={xVal+100} y={yVal+15} value="p"  style="text-right" format="&#xe054;" action={action} />

                    <ButtonH x={xVal} y={yVal+55} value="h1" style="" format="&#xf1dc;" action={action} />
                    <ButtonH x={xVal+50} y={yVal+55} value="h2" style="" format="&#xf1dc;" action={action} />
                    <ButtonH x={xVal+100} y={yVal+55} value="h3"  style="" format="&#xf1dc;" action={action} />
                    <ButtonH x={xVal} y={yVal+95} value="h4" style="" format="&#xf1dc;" action={action} />
                    <ButtonH x={xVal+50} y={yVal+95} value="h5" style="" format="&#xf1dc;" action={action} />

                  <ButtonReg x={xVal} y={yVal+145} value="ul" format="&#xe012;" style="" action={action} />
                  <ButtonReg x={xVal2} y={yVal+145} value="table" format="&#xe011;" style="" action={action} />
                  <ButtonReg x={xVal} y={yVal+185} value="img" format="&#xe060;" style="" action={action} />
                  <ButtonReg x={xVal2} y={yVal+185} value="button" format="&#xe130;" style="btn btn-default" action={action} />
                  <ButtonReg x={xVal} y={yVal+225} value="audio" format="&#xe035;" style="" action={action} />
                  <ButtonReg x={xVal2} y={yVal+225} value="video" format="&#xe059;" style="" action={action} />
                  <ButtonReg x={xVal} y={yVal+265} value="link" format="&#xe144;" style="" action={action} />


                <text x={xVal} y={yVal+320} textAnchor="start" className="small" >Forms</text>
                  <ButtonReg x={xVal} y={yVal+325} value="text" format="&#xe065;" style="" action={action} />
                  <ButtonReg x={xVal2} y={yVal+325} format="&#xe114;" style="" value="option" action={action} />
                  <ButtonReg x={xVal} y={yVal+365} value="file" format="&#xe172;" style="" action={action} />
                  <ButtonReg x={xVal2} y={yVal+365} value="radio" format="&#xe165;" style="" action={action} />

              </g>
    )

})

export default AddOptions;
