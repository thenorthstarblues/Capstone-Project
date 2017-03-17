import React from 'react';
import CodeMirror from 'react-codemirror'
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css')

  //this is real code
const Code = (props) => {

  return (
    <CodeMirror options={{
      mode: 'javascript',
      lineNumbers: true,

     
      }} value={props.htmlString}/>
  )
}

export default Code;

