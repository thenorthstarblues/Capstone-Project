import React from 'react';
import CodeMirror from 'react-codemirror'
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
require('codemirror/lib/codemirror.css')
//import {connect} from 'react-redux'

//var htmlData = require('./fsRead').data || `//display code here`




//this is codemirror supplied code for testing purposes
/*const codetest = React.createClass({
    getInitialState: function() {
        return {
            code: htmlData,
        };
    },
    updateCode: function(newCode) {
        this.setState({
            code: newCode,
        });
    },
    render: function() {
        const options = {
            lineNumbers: true,
        };
        return <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} />
    }
});
export {codetest}
*/


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

