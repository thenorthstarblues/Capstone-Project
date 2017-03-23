import {html, css} from 'js-beautify';
import { theCss } from '../reducers/stockCss.js';

export const getHtml = (dom, node = 0, cssClasses = {} ) =>{ //takes in the object

  let str = '';
  //cssClasses are the new object... holding the class: attributes
  const {children,tag,css,id} = dom[node];

  let cssClass = css.split(' ');

  cssClass.forEach(classCss=>{

    classCss=classCss.trim();
    if (!cssClasses[classCss] && classCss !== ' '){
      cssClasses[classCss] = true;
      //console.log(cssClasses[css]);
    }

  })

  //NEED TO WRITE CLASS CHECK TO CATCH IN-LINE CLASSES AND WRITE TO STYLE
  //MAKE FUNCTION and put in both img and all other tags...


  if(tag === 'img'){
    str += `\n<${tag} src="IMG_NAME"  class="${css}">\n`
  }
  else{
    str+= `<${tag} class="${css}">`

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
      return theCss[cur.trim()]
    });
    //console.log('props', properties.join(''))
    acc += `.${cur} { ${properties.join('')} }\n`; // so this is minifying things for the condensed css
    return acc;
  },'');

  return ourCss;
}

