import {html, css} from 'js-beautify';

const getHtml = (dom, node =0) =>{
  let str = '';
  const {children,tag} = dom[node];
  if(tag === 'img'){
    str += `\n<${tag} src="IMG_NAME">\n`
  }
  else{
    str+= `<${tag}>`
    console.log(children)
    children.sort((prev,child)=> {
      return dom[prev].x - dom[child].x;
    })

    children.forEach((child => {
      str+= getHtml(dom, child);
    }))
    str+= `</${tag}>`
  }
  return str
}

export const getFormattedHtml = dom => (
  html(getHtml(dom).replace(/\n\n/g,'\n'))
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
