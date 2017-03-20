import {html, css} from 'js-beautify';

const getHtml = (dom, node =0) =>{
  let str = '';
  const {children,id} = dom[node];
  if(id === 'img'){
    str += `\n<${id} src="IMG_NAME">\n`
  }
  else{
    str+= `<${id}>`
    children.sort((prev,child)=> {
      return dom[prev].x - dom[child].x;
    })

    children.forEach((child => {
      str+= getHtml(dom, child);
    }))
    str+= `</${id}>`
  }
  return str
}

export const getFormattedHtml = dom => (
  html(getHtml(dom))
)

let str = '';
str += '.flex-container{';
  str += 'display: flex;';
  str += 'flex-flow: row wrap;';
  str += 'justify-content: space-around';
str += '}';
str += '.navigation{';
  str += 'justify-content: space-around';
str += '}';

export const getCss = (theString=str) => (
  css(theString) //eventually call CSS conversion func
);
