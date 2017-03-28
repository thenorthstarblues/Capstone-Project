import { css, divCreation } from './divRecognition.js';

// set everything to Math.floor(dimension/950)*100 and then use 100vw as our unit

//Math.floor(dimension/950*100)... convert into percentages... to cover out percent

//second css driven formatting

function horizonAxisSort(obj, parentId, y){
  var kidsIds = obj[parentId].children; // row then sort by y
  kidsIds=kidsIds.sort((a,b) => { //horizons sorted
    return obj[a][y] - obj[b][y];
  });
  return kidsIds;
}

//consolidate margin math later... to streamline while loops
//

function setRowMargins(obj, parentId){

  var kidsIds = horizonAxisSort(obj, parentId, 'y');

  var ind=0;
  var above=obj[parentId].y;

  while (ind<kidsIds.length && obj[kidsIds[ind]]){ //for each row... must correct the last row catch

      var below=obj[kidsIds[ind]].y;
      var mT = Math.floor((below-above)/950*100); //adjust spacing later
      var mL = Math.floor((obj[kidsIds[ind]].x-obj[parentId].x)/950*100);

        obj[kidsIds[ind]].css += ' flexRow mT'+mT+' mL'+mL+' ';

      above=obj[kidsIds[ind]].y + obj[kidsIds[ind]].height;
      ind++;

  }
};

function setColMargins(obj, parentId){
  var kidsIds = horizonAxisSort(obj, parentId, 'x');

//simple iteration through the vertical to set L margins
  var ind=1;
  var left=obj[kidsIds[0]].x+obj[kidsIds[0]].width;
  var above=obj[parentId].y;

  obj[parentId].css += ' flexRow ';

  while (ind<kidsIds.length){ //for each obj/col... must correct the last row catch

      var right=obj[kidsIds[ind]].x;
      var mL=Math.floor((right-left)/950*100);
      var below=obj[kidsIds[ind]].y;
      var mT = Math.abs(Math.floor((below-above)/950*100));

      obj[kidsIds[ind]].css += ' flexCol mL'+mL+ ' mT'+mT+' ';
      // increment up w/ left & index
      left=obj[kidsIds[ind]].x + obj[kidsIds[ind]].width;
      ind++;
  }

  mL= Math.floor((obj[kidsIds[0]].x - obj[parentId].x)/950*100);
  mT= Math.floor((obj[kidsIds[0]].y - obj[parentId].y)/950*100);
  obj[kidsIds[0]].css = obj[kidsIds[0]].css +' mL'+mL+ ' mT'+mT+' ';

};

function setChildColMargins(obj, parentId){
  var kidsIds = horizonAxisSort(obj, parentId, 'y');

  var ind=0;
  var above=obj[parentId].y;

    while (ind<kidsIds.length){ //for each row... must correct the last row catch

        var below=obj[kidsIds[ind]].y;
        var mT=Math.floor((below-above)/950*100); //adjust spacing later //950x500, 1440x760 display at ratio...1.5 times spacing

        var L = (obj[kidsIds[ind]].x-obj[parentId].x);
        var R = (obj[parentId].x+obj[parentId].width) - (obj[kidsIds[ind]].x+obj[kidsIds[ind]].width);
        var C = (obj[parentId].x+obj[parentId].width/2) - (obj[kidsIds[ind]].x+obj[kidsIds[ind]].width/2);

        var align=''
        if (!C || !L || !R){
          if(!C){align = css.center};
          if(!R){align = css.right};
          if(!L){align = css.left};
        } else {
          align = ' mL'+L+' ';
        }

        //T/R/L margin setting
        obj[kidsIds[ind]].css += ' mT'+mT+' '+align;

        // increment up w/ above & index
        above=obj[kidsIds[ind]].y + obj[kidsIds[ind]].height;
        ind++;
    }
}



export const formatCheck = ((obj, parentId)=>{
  // utility functions to recognize Rows & Columns
  function isRow(elementId){
    return elementId>1000 && elementId<50000;
  }

  //conditionals for setting formats
  //---------------------------------all divs with kids as rows-----------------------------------
    if (obj[parentId].children && obj[parentId].children.some(isRow)){ //sets row margins
      setRowMargins(obj, parentId);
    };
  //--------------------all rows or all divs with kids as columns---------------------------------
    if (parentId>1000 && parentId<50000){
      setColMargins(obj, parentId);
  };
  //---------------------------------all columns to format child margins-------------------------
  if (parentId>50000){ //all divs that are columns, to set kid margins

    if (obj[parentId].parent === '0'){ //columns w/o row wrapper, set top margin
      var top = obj['0'].y;
      var mT=Math.floor((obj[parentId].y-top)/950*100);//for math readjustment later.
      obj[parentId].css += ' flexCol mT'+mT+' ';
    }

    setChildColMargins(obj, parentId);

  };

      //---------------------------------all divs with a single child-------------------------
  if (obj[parentId].children && obj[parentId].children.length===1 ){

    setRowMargins(obj, parentId);

  };

  //-----------------------final check: all childen outside row/columns/divs?-------------------
   if (obj[parentId].css === 'in-line ' && obj[parentId].children.length===0){ //reset conditional. . .

      // haven't figure out if we hit this edge case!
    }


  }) //end of formatting check

  export const cleanCss =((obj, parentId)=>{

    let cssStrArr = obj[parentId].css.split(' ');
    let unique={};
    cssStrArr.forEach(str=>{
      if (!unique[str.trim()] && str.trim()!=="" && str.trim()!=='mT0' && str.trim()!=='mL0' && str.trim()!=='mR0'){
        unique[str.trim()] = true;
      }
    })
    let cssClasses=Object.keys(unique);
    obj[parentId].css = cssClasses.join(' ');

    //this loop should just check for duplicates in css and getRid of all things with margin of 0;
  })

