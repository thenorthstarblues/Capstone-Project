import { css, divCreation } from './divRecognition.js';


//second css driven formatting

function horizonAxisSort(obj, parentId, y){
  var kidsIds = obj[parentId].children; // row then sort by y
  kidsIds=kidsIds.sort((a,b) => { //horizons sorted
    return obj[a][y] - obj[b][y];
  });
  return kidsIds;
}

//consolidate margin math later... to streamline while loops

function setRowMargins(obj, parentId){

    var kidsIds = horizonAxisSort(obj, parentId, 'y');

    //temp catch until the full row recognition works---------------------
    var kidsIdsLost=kidsIds.filter(id=>{
      return !(id>200);
    });

    if (kidsIdsLost.length >0){
      var exRows = Object.keys(obj).filter(key => key.includes('contRow'));
      var lastRow = Math.max(...exRows.map(name=> Number(name.replace('contRow_', ''))));
      var largest={};
      largest.height=Math.min(...kidsIdsLost.map(id=>obj[id].y))+Math.max(...kidsIdsLost.map(id=>obj[id].y+obj[id].height));
      if (lastRow=== '-infinity'){lastRow=0};
      divCreation(obj, parentId, largest, kidsIdsLost, 0, lastRow); //don't need returns
    }
    //temp catch above until the full row recognition works---------------------------------------

  //simple iteration through the horizons to match the margins at the top
  var ind=0;
  var above=obj[parentId].y;

  while (ind<kidsIds.length && obj[kidsIds[ind]]){ //for each row... must correct the last row catch

      var below=obj[kidsIds[ind]].y;
      var mT = (Math.floor((below-above)/10))*10; //adjust spacing later
      var mL = (Math.floor((obj[kidsIds[ind]].x-obj[parentId].x)/10))*10;

      //T/R/L margin setting
      obj[kidsIds[ind]].css += ' mT'+mT+' mL'+mL+' ';

      // increment up w/ above & index
      above=obj[kidsIds[ind]].y + obj[kidsIds[ind]].height;
      ind++;

  }
};

function setColMargins(obj, parentId){
  var kidsIds = horizonAxisSort(obj, parentId, 'x');

//simple iteration through the vertical to set L margins
  var ind=1;
  var left=obj[kidsIds[0]].x+obj[kidsIds[0]].width;

  while (ind<kidsIds.length){ //for each obj/col... must correct the last row catch

      var right=obj[kidsIds[ind]].x;
      var mL=(Math.floor((right-left)/10))*10; //adjust spacing later
      obj[kidsIds[ind]].css = obj[kidsIds[ind]].css +' mL'+mL+' '; //L margin setting
      // increment up w/ left & index
      left=obj[kidsIds[ind]].x + obj[kidsIds[ind]].width;
      ind++;
  }

  //catch on very left if column w/o row... need to have mL0, but will catch columns in box 0!
  mL=(Math.floor((obj[kidsIds[0]].x - obj[parentId].x)/10))*10;
  obj[kidsIds[0]].css = obj[kidsIds[0]].css +' mL'+mL+' ';

};

function setChildColMargins(obj, parentId){
  var kidsIds = horizonAxisSort(obj, parentId, 'y');

  var ind=0;
  var above=obj[parentId].y;

    while (ind<kidsIds.length){ //for each row... must correct the last row catch

        var below=obj[kidsIds[ind]].y;
        var mT=(Math.floor((below-above)/10))*10; //adjust spacing later //950x500, 1440x760 display at ratio...1.5 times spacing

        var L = (obj[kidsIds[ind]].x-obj[parentId].x);
        var R = (obj[parentId].x+obj[parentId].width) - (obj[kidsIds[ind]].x+obj[kidsIds[ind]].width);
        var C = (obj[parentId].x+obj[parentId].width/2) - (obj[kidsIds[ind]].x+obj[kidsIds[ind]].width/2);

        var align=''
        if (!C || !L || !R){
          if(!C){align = css.center };
          if(!L){align = css.left};
          if(!R){align = css.right};
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
    return elementId>100 && elementId<200;
  }
  //basics for bootstrap/flex
  if (parentId ==='0'){
    obj[parentId].css += css.cont ;
  }

  //conditionals for setting formats
  //---------------------------------all divs with kids as rows-----------------------------------
    if (obj[parentId].children && obj[parentId].children.some(isRow)){ //sets row margins
      setRowMargins(obj, parentId);
    };
  //--------------------all rows or all divs with kids as columns---------------------------------
    //if (obj[parentId].children && obj[parentId].children.some(isCol)){
    if (parentId>100 && parentId<200){
      setColMargins(obj, parentId);
  };
  //---------------------------------all columns to format child margins-------------------------
  if (obj[parentId].id>200){ //all divs that are columns, to set kid margins

    if (obj[parentId].parent === '0'){ //columns w/o row wrapper, set top margin
      var top = obj['0'].y;
      var mT=(Math.floor((obj[parentId].y-top)/10))*10;//for math readjustment later.
      obj[parentId].css += ' mT'+mT+' ';
    }

    setChildColMargins(obj, parentId);

  };

      //---------------------------------all divs with a single child-------------------------
  if (obj[parentId].children && obj[parentId].children.length===1 ){
    //set margins on child
    setRowMargins(obj, parentId);

  };

  //-----------------------final check: all childen outside row/columns/divs?-------------------
   if (obj[parentId].css === 'in-line ' && obj[parentId].children.length===0){ //reset conditional. . .

    //console.log('unformatted: ', parentId, obj[parentId].css);
  //   //rows w/ raw objs... objects w/ in-line only and parents not equal to row or column

  //   var parent= obj[parentId].parent;

        // if (parent.toString().includes('contRow')){

          //repeat Row match...

        // if (parent.toString().includes('contCol')){

          //repeat Column child match...

      //   }

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

