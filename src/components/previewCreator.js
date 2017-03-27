import { html, css } from 'js-beautify';
import { theCss } from '../reducers/stockCss';


export const head = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="/favicon.ico">
    <title>Your Agile Armature Output</title>
    <link href="REPLACE WITH YOUR GENERATED CSS STYLE SHEET" rel="stylesheet" type="text/css">
  </head>
<body>\n`;

export const end = `\n</body>
<!--any additional script references-->
</html>`;

export const getHtml = (dom, node = '0', cssClasses = {}) => {
  let str = '';
  const { children, tag, css, id, width, height } = dom[node];

  const cssClass = css.split(' ');

  cssClass.forEach((classCss) => {
    classCss = classCss.trim();
    if (!cssClasses[classCss] && classCss !== ' ') {
      cssClasses[classCss] = true;
      // console.log(cssClasses[css]);
    }
  });

  if (tag === 'img') {
    if (!css.includes('in-line')) {
      str += `\n<${tag} src="IMG_NAME"  class="${css}">\n`;
    } else if (css.includes('in-line')) {
      var nCss = css.replace(/in-line/g, '');
      str += `\n<${tag} src="IMG_NAME"  class="${nCss}" style=" width:${width}px; height:${height}px ;" >\n`;
    }
  }  else {
    if (!css.includes('in-line')) {
      str += `<${tag} class="${css}">`;
    } else {
      var nCss = css.replace(/in-line/g, '');
      str += `<${tag} class="${nCss}" style=" width:${width}px ; height:${height}px ;" >`;
    }

    children.sort((prev, child) => dom[prev].x - dom[child].x);

    children.forEach(((kidId) => {
      let { string } = getHtml(dom, kidId, cssClasses);
      str += string;
    }));

    str += `</${tag}>`;
  }

  return { string: str, css: cssClasses };
};


export const getFormattedHtml = ((dom) => {
  let { string } = getHtml(dom);
  return html(string.replace(/\n\n/g, '\n'));
});


export const getCss = (theCss, classes) => { // classes will be our cssClasses
  const ourCss = Object.keys(classes).reduce((acc, cur) => {
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

          }
            return theCss[cur];


    });
    // console.log('props', properties.join(''))
    acc += `.${cur} { ${properties.join('')} }\n`; // so this is minifying things for the condensed css
    return acc;
  }, '');

  return ourCss;
};

