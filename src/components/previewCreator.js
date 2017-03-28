import { html, css } from 'js-beautify';
import { theCss } from '../reducers/stockCss';
import { loremIpsum, lineLorem, paraLorem } from '../style/css/stockLoremIpsum';


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
      var nCss = css.replace(/in-line/g, '');
      str += `\n<${tag} src="IMG_NAME"  class="${nCss}" style=" width:${Math.floor(width/950*100)}vw; height:${Math.floor(height/950*100)}vw ;" >\n`;
  }  else {
      var nCss = css.replace(/in-line/g, '');
      str += `<${tag} class="${nCss}" style=" width:${Math.floor(width/950*100)}vw; height:${Math.floor(height/950*100)}vw ;" >`;

    children.sort((prev, child) => dom[prev].x - dom[child].x);

    children.forEach(((kidId) => {
      let { string } = getHtml(dom, kidId, cssClasses);
      str += string;
    }));

    str += `</${tag}>`;
  }

  return { string: str, css: cssClasses };
};

//SECONDARY FORMATTING PREVIEW VERSION -  could also include a different conditional for alt routes in the main version
//add 1px border to all with overflow - hidden, lorem ipsum - 1 line or 1 paragraph for p vs. header
export const getHtmlPre = (dom, node = '0', cssClasses = {}) => {
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
      var nCss = css.replace(/in-line/g, '');
      str += `\n<${tag} src="/cat.jpg"  class=" ${nCss}" style=" width:${Math.floor(width/950*100)}vw; height:${Math.floor(height/950*100)}vw ;" >\n`;
  }  else {
      var nCss = css.replace(/in-line/g, '');
      //all additions and alterations go here-
      if (tag==='p'){
          let lines=height/16;
          let breadth=width/6;
          let lorem=``
          for (let i=0; i<lines; i++) {let ran=Math.floor(Math.random()*paraLorem.length); lorem += paraLorem[ran].slice(0,breadth)+`<br/>`;}
          str += `<${tag} class=" ${nCss}" style=" width:${Math.floor(width/950*100)}vw; height:${Math.floor(height/950*100)}vw ;" > ${lorem}`;
      } else if (tag==='ul' || tag ==='table'){
          let lines=height/16;
          let breadth=width/10;
          let lorem=``
          for (let i=0; i<lines; i++) {let ran=Math.floor(Math.random()*paraLorem.length); lorem += `-- ` + paraLorem[ran].slice(0,breadth)+`<br/>`;}
          str += `<${tag} class="Trenda ${nCss}" style=" width:${Math.floor(width/950*100)}vw; height:${Math.floor(height/950*100)}vw ;" > ${lorem}`;
      }else if (tag.includes('h')){
          str += `<${tag} class=" ${nCss} TrendHandMade" style=" width:${Math.floor(width/950*100)}vw; height:${Math.floor(height/950*100)}vw ;" > ${lineLorem}`;
      }else if (tag.includes('div') && id > 100){
          str += `<${tag} class="pborder ${nCss}" style=" width:${Math.floor(width/950*100)}vw; height:${Math.floor(height/950*100)}vw ;" >`;
      } else {
          str += `<${tag} class="pborder ${nCss}" style=" width:${Math.floor(width/950*100)}vw; height:${Math.floor(height/950*100)}vw ;" >`;
      }

    children.sort((prev, child) => dom[prev].x - dom[child].x);

    children.forEach(((kidId) => {
      let { string } = getHtmlPre(dom, kidId, cssClasses);
      str += string;
    }));

    str += `</${tag}>`;
  }

  return { string: str, css: cssClasses };
};

//revise and consolidate these two routes

export const getFormattedHtmlPre = ((dom) => {
  let { string } = getHtmlPre(dom);
  return html(string.replace(/\n\n/g, '\n'));
});


export const getFormattedHtml = ((dom) => {
  let { string } = getHtml(dom);
  return html(string.replace(/\n\n/g, '\n'));
});


export const getCss = (theCss, classes) => { // classes will be our cssClasses
  const ourCss = Object.keys(classes).reduce((acc, cur) => {
    const props = (cur.split(' '));
    const properties = props.map((cur)=>{
          cur=cur.trim();

          if (cur.includes('mT')){ //auto generate margins
            var values = cur.replace('mT','');
              return `margin-top:${values}vw;`;
          } else if (cur.includes('mL')){
            var values = +cur.replace('mL','');
              return `margin-left:${values}vw;`;
          } else if (cur.includes('mR')){
            var values = +cur.replace('mR','');
              return `margin-left:${values}vw;`;
          }
          //auto setting of sizes already done in css series
            return theCss[cur];


    });
    // console.log('props', properties.join(''))
    acc += `.${cur} { ${properties.join('')} }\n`; // so this is minifying things for the condensed css
    return acc;
  }, '');

  return ourCss;
};

