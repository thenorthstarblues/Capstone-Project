import {html, css} from 'js-beautify';
import { theCss } from '../reducers/stockCss.js';

export const getHtml = (dom, node = 0, cssClasses = {} ) =>{ //takes in the object

  let str = '';
  //cssClasses are the new object... holding the class: attributes
  const {children,tag,css,id, width,height} = dom[node];

  let cssClass = css.split(' ');

  cssClass.forEach(classCss=>{

    classCss=classCss.trim();
    if (!cssClasses[classCss] && classCss !== ' '){
      cssClasses[classCss] = true;
      //console.log(cssClasses[css]);
    }

  })

  if(tag === 'img'){
    if (!css.includes('in-line')){
      str += `\n<${tag} src="IMG_NAME"  class="${css}">\n`
    } else if (css.includes('in-line')){
      var nCss = css.replace(/in-line/g, "");
      str += `\n<${tag} src="IMG_NAME"  class="${nCss}" style=" width:${width}px; height:${height}px ;" >\n`
    }
  }
  else{
    if (!css.includes('in-line')){
      str+= `<${tag} class="${css}">`
    } else {
      var nCss = css.replace(/in-line/g, "");
      str+= `<${tag} class="${nCss}" style=" width:${width}px ; height:${height}px ;" >`
    }

    children.sort((prev,child)=> {
      return dom[prev].x - dom[child].x;
    })

    children.forEach((kidId => {
      var {string} = getHtml(dom, kidId, cssClasses);
      str+= string;
    }))

    str+= `</${tag}>`
  }

  return {string: str, css: cssClasses}
}


export const getFormattedHtml = (dom => {
  var {string} = getHtml(dom);
  return html(string.replace(/\n\n/g,'\n'));

})


export const getCss = (theCss, classes) => { //classes will be our cssClasses

  const ourCss = Object.keys(classes).reduce((acc,cur)=>{
    const props = (cur.split(' '));
    const properties = props.map((cur)=>{
          cur=cur.trim();

          if (cur.includes('mT')){
            var values = cur.replace('mT','');
              return `margin-top:${values}px;`;
          } else if (cur.includes('mL')){
            var values = +cur.replace('mL','');
              return `margin-left:${values}px;`;
          } else if (cur.includes('mR')){
            var values = +cur.replace('mR','');
              return `margin-left:${values}px;`;
          } else if (cur.includes('m')){ // grab margin classes to create properties
            var values = cur.replace('m','');
              return `margin:${values}px;`;

          } else if (cur.includes('p')){ // grab padding classes to create properties
            var values = +cur.replace('p','');
              return `margin-left:${values}px;`;

          } else {
            console.log(cur);
            return theCss[cur];
          }

    });
    //console.log('props', properties.join(''))
    acc += `.${cur} { ${properties.join('')} }\n`; // so this is minifying things for the condensed css
    return acc;
  },'');

  return ourCss;
}

