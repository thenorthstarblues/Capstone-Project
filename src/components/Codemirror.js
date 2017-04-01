import React from 'react';
import CodeMirror from 'react-codemirror'
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css');

const FileSaver = require('file-saver');

 export const download = (file) => {
   var blob = new Blob([file], { type:"html;charset=utf-8" });
   FileSaver.saveAs(blob, 'index.html');
 }

  export const downloadcss = (file) => {
   var blob = new Blob([file], { type:"html;charset=utf-8" });
   FileSaver.saveAs(blob, 'index.css');
 }


const Code = (props) => {

  return (
    <CodeMirror options={{
      mode: 'javascript',
      lineNumbers: true,


      }} value={props.htmlString}/>
  )
}









export default Code;


