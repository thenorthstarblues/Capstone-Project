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
    icon: 'glyphicon glyphicon-header',
    style: '',
  },
  {
    val: 'h2',
    icon: 'glyphicon glyphicon-header',
    style: '',
  },
  {
    val: 'h3',
    icon: 'glyphicon glyphicon-header',
    style: '',
  },
  {
    val: 'h4',
    icon: 'glyphicon glyphicon-header',
    style: '',
  },
  {
    val: 'h5',
    icon: 'glyphicon glyphicon-header',
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
    icon: 'glyphicon glyphicon-facetime-video',
    style: '',
  },
  {
    val: 'audio',
    icon: 'glyphicon glyphicon-headphones',
    style: '',
  },
  {
    val: 'button',
    icon: 'glyphicon glyphicon-hand-down',
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
    icon: 'glyphicon glyphicon-record',
    style: 'text-right',
  },
  {
    val: 'file',
    icon: 'glyphicon glyphicon-floppy-disk',
    style: 'text-right',
  },
  {
    val: 'options',
    icon: 'glyphicon glyphicon-chevron-down',
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
                {buttons.map((button, i)=>{
                  if (button.val==='div' || button.val==='h5'|| button.val==='button'){
                    return (
                          <span key={button.val+i} >
                          <button className="btn btn-default m5w bshadsm" value={button.val} onClick={action} data={button.style}><span className={button.icon}></span>  {button.val}</button>
                          <br/>
                          </span>
                          )

                  } else {

                  return (
                          <button  key={button.val+i} className="btn btn-default m5w bshadsm" value={button.val} onClick={action} data={button.style}><span className={button.icon}></span>  {button.val}</button>
                          )
                  }

                })}

                <p className="closer small TrendHandMade">form types</p>

                {buttonsForm.map((button,i)=>{

                  return (
                          <button key={button.val+i} className="btn btn-default m5w " value={button.val} onClick={action} data={button.style}><span className={button.icon}></span>  {button.val}</button>
                          )
                })}
                </div>
            </div>
    )

})

export default AddOptions;
