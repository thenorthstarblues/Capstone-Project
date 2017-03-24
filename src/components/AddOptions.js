import React, { Component } from 'react';

let buttons= [
  {
    val: 'div',
    icon: 'glyphicon glyphicon-unchecked',
    style: '',
  },
  {
    val: 'p',
    icon: 'glyphicon glyphicon-align-left',
    style: 'text-left',
  },
  {
    val: 'p',
    icon: 'glyphicon glyphicon-align-center',
    style: 'text-center',
  },
  {
    val: 'p',
    icon: 'glyphicon glyphicon-align-right',
    style: 'text-right',
  },
  {
    val: 'h1',
    icon: 'glyphicon glyphicon-plus',
    style: '',
  },
  {
    val: 'h2',
    icon: 'glyphicon glyphicon-align-left',
    style: '',
  },
  {
    val: 'h3',
    icon: 'glyphicon glyphicon-align-center',
    style: '',
  },
  {
    val: 'h4',
    icon: 'glyphicon glyphicon-align-right',
    style: '',
  },
  {
    val: 'h5',
    icon: 'glyphicon glyphicon-align-right',
    style: '',
  },
  {
    val: 'ul',
    icon: 'glyphicon glyphicon-th-list',
    style: '',
  },
  {
    val: 'table',
    icon: 'glyphicon glyphicon-th',
    style: '',
  },
  {
    val: 'img',
    icon: 'glyphicon glyphicon-picture',
    style: '',
  },
  {
    val: 'video',
    icon: 'glyphicon glyphicon-align-right',
    style: '',
  },
  {
    val: 'audio',
    icon: 'glyphicon glyphicon-align-right',
    style: '',
  },
  {
    val: 'button',
    icon: 'glyphicon glyphicon-align-right',
    style: '',
  },
];

const buttonsForm= [
  {
    val: 'text',
    icon: 'glyphicon glyphicon-edit',
    style: '',
  },
  {
    val: 'radio',
    icon: 'glyphicon glyphicon-align-right',
    style: 'text-right',
  },
  {
    val: 'audio',
    icon: 'glyphicon glyphicon-align-right',
    style: 'text-right',
  },
  {
    val: 'audio',
    icon: 'glyphicon glyphicon-align-right',
    style: 'text-right',
  },


]


const AddOptions = (({action})=> {
  //console.log(action);

    return (
              <div className="addOptionsInt">
                <div className="border1">
                  <p className="closer"><span className="TrendHandMade">GROUP:</span> create & iterate</p>
                  <form onClick="">
                    <input ></input>
                    <button className="btn btn-default btn-sm m5w bshadsm" value="" ><span className="glyphicon glyphicon-ok"></span>  new</button>
                    <button className="btn btn-default btn-sm m5w bshadsm" value="" ><span className="glyphicon glyphicon-plus"></span>  var</button>
                    <button className="btn btn-default btn-sm m5w bshadsm" value="" ><span className="glyphicon glyphicon-minus"></span>  var</button>
                  </form>
                </div>
                <div className="border1">
                <p className="closer"><span className="TrendHandMade">CLICK:</span> add to armature</p>
                {buttons.map(button=>{
                  if (button.val==='div' || button.val==='h5'|| button.val==='button'){
                    return (
                          <span>
                          <button className="btn btn-default m5w bshadsm" value={button.val} onClick={action} data={button.style}><span className={button.icon}></span>  {button.val}</button>
                          <br/>
                          </span>
                          )

                  } else {

                  return (
                          <button className="btn btn-default m5w bshadsm" value={button.val} onClick={action} data={button.style}><span className={button.icon}></span>  {button.val}</button>
                          )
                  }

                })}

                <p className="closer small TrendHandMade">form types</p>

                {buttonsForm.map(button=>{

                  return (
                          <button className="btn btn-default m5w bshadsm" value={button.val} onClick={action} data={button.style}><span className={button.icon}></span>  {button.val}</button>
                          )
                })}
                </div>
            </div>
    )

})

export default AddOptions;
