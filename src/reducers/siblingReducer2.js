
export const SIB_RECOG = 'SIB_RECOG';

//this is the recursive bit:
const findSiblings = (test => { // one giant object, with each id-object as held

  const boxObjs=Object.assign({}, test); //clone and begin manipulation
  let len=Object.keys(boxObjs);

  //add function below and include here...
    for (let i=0; i<len.length; i++){

        if (boxObjs[i]){ //originals are numbers, so will only iterate through originals
            columnRowCheck(boxObjs, i, boxObjs[i].children);
        }
    } //done with layer checks

  len=Object.keys(boxObjs);

    len.forEach((box)=>{ //to a forEach
        console.log('formatCheck', box);
        formatCheck(boxObjs,box); //array of all, id of current
    });

  //return boxObjs;
    return {
    type: SIB_RECOG,
    boxesCss:boxObjs,
  }

});

//-----------------------initial state ...stuffing state------------

//const initialState = test; // just for initial testing

const initialState = {
  boxes=[],
  boxesCss=[],
}

//---------------------------action reducer---------------------------

const siblingReducer = (prevState = initialState, action) => {
  let nextState = Object.assign({}, prevState);

  switch(action.type) {
    case SIB_RECOG:
      nextState.boxesCss = action.boxesCss;
      break;

    default:
      return prevState;
  }
  return nextState;
}

export default siblingReducer;


//--------------------------REPL.IT FUNCTIONS---------------------------

const test={
  0:{ id:0, height:400, width:720, x:0, y:0, parent:null, children:[1,2,3,4,5,6,7,8,9,10,11,12,13, 14, 15, 16, 17], tag: 'div', css: ' '},
  1:{id:1, height:200, width:200, x:20, y: 20, parent:0,children:[],tag:'div',css:' '},
  2:{id:2, height:20, width:200, x:240, y:20, parent:0, children:[],tag:'div',css:' '},
  3:{id:3, height:20, width:160, x:240, y:60, parent:0, children:[],tag:'div',css:' '},
  4:{id:4, height:20, width:180, x:240, y:100, parent:0, children:[],tag:'div',css:' '},
  5:{id:5, height:20, width:80, x:300, y:120, parent:0, children:[],tag:'div',css:' '},
  10:{id:10, height:20, width:200, x:460, y:20, parent:0, children:[],tag:'div',css:' '},
  11:{id:11, height:20, width:160, x:460, y:60, parent:0, children:[],tag:'div',css:' '},
  12:{id:12, height:20, width:180, x:460, y:100, parent:0, children:[],tag:'div',css:' '},
  13:{id:13, height:20, width:80, x:460, y:120, parent:0, children:[],tag:'div',css:' '},
  6:{id:6, height:60, width:60, x:20, y:240, parent:0, children:[],tag:'div',css:' '},
  7:{id:7, height:60, width:60, x:100, y:240, parent:0, children:[],tag:'div',css:' '},
  8:{id:8, height:60, width:60, x:180, y:240, parent:0, children:[],tag:'div',css:' '},
  9:{id:9, height:60, width:60, x:260, y:240, parent:0, children:[],tag:'div',css:' '},
  14:{id:14, height:60, width:60, x:20, y:320, parent:0, children:[],tag:'div',css:' '},
  15:{id:15, height:60, width:60, x:100, y:320, parent:0, children:[],tag:'div',css:' '},
  16:{id:16, height:20, width:60, x:180, y:320, parent:0, children:[],tag:'div',css:' '},
  17:{id:17, height:20, width:60, x:260, y:350, parent:0, children:[],tag:'div',css:' '},
}

const css={ //incorporate margins/padding later as string concat / string replace
  start:'flexCol startVert ',
  center:'flexCol centerVert ',
  end:'flexCol endVert ',
  top:'flexRow startVert ',
  middle:'flexRow centerVert ',
  bottom:'flexRow endVert ',
  none: 'in-line ',
}

//this is the recursive bit:
const findSiblings = (test => { // one giant object, with each id-object as held

  const boxObjs=Object.assign({}, test); //clone and begin manipulation
  let len=Object.keys(boxObjs);

  //add function below and include here...
    for (let i=0; i<len.length; i++){

        if (boxObjs[i]){ //originals are numbers, so will only iterate through originals
            columnRowCheck(boxObjs, i, boxObjs[i].children);
        }
    } //done with layer checks


  len=Object.keys(boxObjs);


    len.forEach((box)=>{ //to a forEach
        console.log('formatCheck', box);
        formatCheck(boxObjs,box); //array of all, id of current
    });

  //return boxObjs;
    return {
    type: SIB_RECOG,
    boxesCss:boxObjs,
  }

});

function columnRowCheck(obj, parentId, childIdArr, largest={}, remainIdArr=[], dir=0, row=0){
  // full obj list, 3, [2,5,7,8] as input, adds for iterating through new container ids
  console.log('iteration: ', parentId, dir, childIdArr, remainIdArr);

  if (childIdArr.length===0){ // 0 children
    obj[parentId].css = css.none; //no padding here... specific object size
    //no children, do nothing, done
  } else if (childIdArr.length === 1){ // 1 child

    console.log('only 1 kid');
    //object and its child : set parent to flex wrap (i.e. row)
    //return to this later

  } else { // 2 or more children, recursion here

    // all children, find largest
    let childAreas = childIdArr.map(child => obj[child].width*obj[child].height );
    let bigKidI = childAreas.indexOf(Math.max(...childAreas));
        largest = obj[childIdArr[bigKidI]];

    if (!dir) { // row search on initial round
      //grab horizons
      let y0 = largest.y;
      let y1 = largest.y+largest.height;

      // find siblings within those horizons for a row
      var idRow = childIdArr.filter(child => {
        return (obj[child].y>=y0 && (obj[child].y+obj[child].height)<=y1);
      })

      var remains = childIdArr.filter(child => {
        return !(obj[child].y>=y0 && (obj[child].y+obj[child].height)<=y1);
      })

      remainIdArr.push(remains);

    } else { // column search from within rows

      //grab vertical edges
      let x0 = largest.x;
      let x1 = largest.x+largest.width;


      // find siblings within those horizons for a row
      var idCol = childIdArr.filter(child => {
        return (obj[child].x>=x0 && (obj[child].x+obj[child].width)<=x1);
      })

      var remains = childIdArr.filter(child => {
        return !(obj[child].x>=x0 && (obj[child].x+obj[child].width)<=x1);
      })

      remainIdArr.push(remains);
    }

    if (idRow && idRow.length>1){ // largest + sibling

      let newdir=dir+1;
      let rowId="contRow_"+row+'.'+newdir;

      let newRow = {
         id: rowId,
         height: largest.height,
         width: Math.min(...idRow.map(id=>obj[id].x))+Math.max(...idRow.map(id=>obj[id].x+obj[id].width)),
         x: Math.min(...idRow.map(id=>obj[id].x)),
         y: Math.min(...idRow.map(id=>obj[id].y)),
         parent: parentId,
         children: idRow,
         tag: 'div',
         css: 'flexRow ' }; //height is auto

      obj[rowId]=newRow; //add new object to overall list
      obj[parentId].children.push(rowId); //new child add

      idRow.forEach(childId=>{ //remove child references, rework parent references
        let sl=obj[parentId].children.indexOf(childId);

        obj[parentId].children.splice(sl,1); //child remove
        obj[childId].parent = rowId; // parent
      })

       idRow = idRow.filter(id=> id !== largest.id);
      // //remove largest

      // // //recurse through children for columns / repeat as necessary
      columnRowCheck(obj, rowId, idRow, largest, remainIdArr, newdir, row+1);

      // idRow = childIdArr.filter(child => idRow.indexOf(child)===-1);
      // remainIdArr.pop();

      // if (idRow.length>0){
      //   columnRowCheck(obj, parentId, idRow, largest, remainIdArr, newdir, row);
      // } else {
      //   columnRowCheck(obj, 0, remainIdArr[0], largest, [], 0, row);
      // }
    }


    if (idCol && idCol.length>1){ // largest + sibling
      //console.log(idCol);

      let newdir=dir+1;
      let colId="contCol_"+0+'.'+newdir;

      let newCol = {
         id: colId,
         height: obj[parentId].height,
         width: largest.width,
         x: Math.min(...idCol.map(id=>obj[id].x)),
         y: Math.min(...idCol.map(id=>obj[id].y)),
         parent: parentId,
         children: idCol,
         tag: 'div',
         css: 'flexCol ' }; //height is auto

      obj[colId]=newCol; //add new object to overall list
      obj[parentId].children.push(colId); //new child add

      idCol.forEach(childId=>{ //remove child references, rework parent references
        let sl=obj[parentId].children.indexOf(childId);

        obj[parentId].children.splice(sl,1); //child
        obj[childId].parent = colId; // parent
      })

      idCol = childIdArr.filter(child => idCol.indexOf(child)===-1);
      remainIdArr.pop();

      if (idCol.length>0){
        columnRowCheck(obj, parentId, idCol, largest, remainIdArr, newdir, row);
      } else {
        columnRowCheck(obj, 0, remainIdArr[0], largest, [], 0, row);
      }
    }

    console.log('outside loops at end: ', parentId);
  }
}

//second css driven formatting

function formatCheck(obj, parentId){

  // utility functions to recognize Rows & Columns
  function isRow(elementId){
    return elementId.toString().includes('contRow');
  }

  function isCol(elementId){
    return elementId.toString().includes('contCol');
  }

//basics for bootstrap/flex
  if (parentId==='0'){
    obj[parentId].css= obj[parentId].css + 'container-fluid ';
  }

  //things w/o children, already tagged for 'in-line', catch things w/ one child at end

  //conditionals for setting formats
  //---------------------------------all divs with kids as rows-----------------------------------
    if (obj[parentId].children && obj[parentId].children.some(isRow)){ //sets row margins

        var kidsIds = obj[parentId].children; // row then sort by y
        kidsIds=kidsIds.sort((a,b) => { //horizons sorted
          return obj[a].y - obj[b].y
        });

        //temp catch until the full row recognition works---------------------------------------
        kidsIdsLost=kidsIds.filter(id=>{
          return !(id.toString().includes('contRow'));
        });

        console.log('escaped children: ', kidsIdsLost);

        if (kidsIdsLost.length >0){
        //create Row now...
          var exRows = Object.keys(obj).filter(key => key.includes('contRow'));
          var lastRow = Math.max(...exRows.map(name=> Number(name.replace('contRow_', ''))));
          var newId= 'contRow_'+(lastRow+1);
          var largest= 0;

             let newRow = {
               id: newId,
               height: 0,//largest.height,
               width: Math.min(...kidsIdsLost.map(id=>obj[id].x))+Math.max(...kidsIdsLost.map(id=>obj[id].x+obj[id].width)),
               x: Math.min(...kidsIdsLost.map(id=>obj[id].x)),
               y: Math.min(...kidsIdsLost.map(id=>obj[id].y)),
               parent: parentId,
               children: kidsIdsLost,
               tag: 'div',
               css: 'flexRow ' }; //height is auto

            obj[newId]=newRow; //add new object to overall list
            obj[parentId].children.push(newId); //new child add

            kidsIdsLost.forEach(childId=>{ //remove child references, rework parent references
              let sl=obj[parentId].children.indexOf(childId);

              obj[parentId].children.splice(sl,1); //child remove
              obj[childId].parent = newId; // parent
            })

        }

        //temp catch above until the full row recognition works---------------------------------------

      //simple iteration through the horizons to match the margins at the top
      var ind=0;
      var above=obj[parentId].y;

      while (ind<kidsIds.length){ //for each row... must correct the last row catch
          console.log('setting Row margings: ',obj[kidsIds[ind]] );

          var below=obj[kidsIds[ind]].y;
          var mT=(Math.floor((below-above)/10))*10; //adjust spacing later
          //(mT<10)? mT=10 : mT=mT;
          //950x500, 1440x760 display at ratio...1.5 times spacing
          //

          var mL = obj[kidsIds[ind]].x-obj[parentId].x;
          var mR = (obj[parentId].x+obj[parentId].width) - (obj[kidsIds[ind]].x+obj[kidsIds[ind]].width);

          //T/R/L margin setting
          obj[kidsIds[ind]].css = obj[kidsIds[ind]].css + 'mT'+mT+' mR'+mR+' mL'+mL+' ';

          // increment up w/ above & index
          above=obj[kidsIds[ind]].y + obj[kidsIds[ind]].height;
          ind++;

      }

    };
  //--------------------all rows or all divs with kids as columns-----------------------------------

    //if (obj[parentId].children && obj[parentId].children.some(isCol)){
    if (parentId.includes('contRow')){
      console.log('is a row: ', parentId);

        var kidsIds = obj[parentId].children; // row then sort by x
        kidsIds=kidsIds.sort((a,b) => { //verticals sorted
          return obj[a].x - obj[b].x
        });

      console.log('setting Col+ margings: ',[kidsIds] );
      //IF PARENT IS A ROW
      // do we ever have a column w/o row?

      //simple iteration through the vertical to set L margins
      var ind=1;
      var left=obj[kidsIds[0]].x+obj[kidsIds[0]].width;

      while (ind<kidsIds.length){ //for each obj/col... must correct the last row catch
          console.log('setting margings: ',obj[kidsIds[ind]] );

          var right=obj[kidsIds[ind]].x;
          var mL=(Math.floor((right-left)/10))*10; //adjust spacing later
          //(mT<10)? mT=10 : mT=mT;

          //L margin setting
          obj[kidsIds[ind]].css = obj[kidsIds[ind]].css +' mL'+mL+' ';

          // increment up w/ left & index
          left=obj[kidsIds[ind]].x + obj[kidsIds[ind]].width;
          ind++;

      }

      //catch on very left if column w/o row... need to have mL0, but will catch columns in box 0!
      mL=(Math.floor((obj[kidsIds[0]].x - obj[parentId].x)/10))*10;

      obj[kidsIds[0]].css = obj[kidsIds[0]].css +' mL'+mL+' ';

  };

  //---------------------------------all columns to format child margins-------------------------
  if (obj[parentId].id.toString().includes('contCol')){ //all divs that are columns, to set kid margins

    if (obj[parentId].parent === '0'){ //columns w/o row wrapper, set top margin
      var top = obj['0'].y;
      var mT=(Math.floor((obj[parentId].y-top)/10))*10;//for math readjustment later.

      obj[parentId].css= obj[parentId].css+' mT'+mT+' ';

    }

    var kidsIds = obj[parentId].children; // row then sort by y
        kidsIds=kidsIds.sort((a,b) => { //horizons sorted
          return obj[a].y - obj[b].y
        });

    var ind=0;
    var above=obj[parentId].y;

      while (ind<kidsIds.length){ //for each row... must correct the last row catch
          console.log('setting Row margings: ',obj[kidsIds[ind]] );

          var below=obj[kidsIds[ind]].y;
          var mT=(Math.floor((below-above)/10))*10; //adjust spacing later
          //(mT<10)? mT=10 : mT=mT;
          //950x500, 1440x760 display at ratio...1.5 times spacing
          //

          var L = (obj[kidsIds[ind]].x-obj[parentId].x);
          var R = (obj[parentId].x+obj[parentId].width) - (obj[kidsIds[ind]].x+obj[kidsIds[ind]].width);
          var C = (obj[parentId].x+obj[parentId].width/2) - (obj[kidsIds[ind]].x+obj[kidsIds[ind]].width/2);

          var align=''
          if (!C || !L || !R){
            if(!C){align=' selfCenter'};
            if(!L){align=' selfStart'};
            if(!R){align=' selfEnd'};
          } else {
            align = ' mL'+L+' ';
          }

          //T/R/L margin setting
          obj[kidsIds[ind]].css = obj[kidsIds[ind]].css + 'mT'+mT+align;

          // increment up w/ above & index
          above=obj[kidsIds[ind]].y + obj[kidsIds[ind]].height;
          ind++;
      }

  };

      //---------------------------------all divs with a single child-------------------------
  if (obj[parentId].children && obj[parentId].children.length===1 ){
    //set margins on child
    // fill out this case later!

  };

  //-----------------------final check: all childen outside row/columns/divs?-------------------
  if (obj[parentId].css === 'in-line ' ){ //reset conditional. . .
    //rows w/ raw objs... objects w/ in-line only and parents not equal to row or column

    var parent= obj[parentId].parent;

        if (parent.toString().includes('contRow')){


                  var kidsIds = obj[parent].children; // row then sort by x
              kidsIds=kidsIds.sort((a,b) => { //verticals sorted
                return obj[a].x - obj[b].x
              });

            console.log('setting item margings: ',[kidsIds] );
            //IF PARENT IS A ROW
            // do we ever have a column w/o row?

            //simple iteration through the vertical to set L margins
            var ind=1;
            var left=obj[kidsIds[0]].x+obj[kidsIds[0]].width;

            while (ind<kidsIds.length){ //for each obj/col... must correct the last row catch
                console.log('setting margings: ',obj[kidsIds[ind]] );

                var right=obj[kidsIds[ind]].x;
                var mL=(Math.floor((right-left)/10))*10; //adjust spacing later
                //(mT<10)? mT=10 : mT=mT;

                //L margin setting
                obj[kidsIds[ind]].css = obj[kidsIds[ind]].css +' mL'+mL+' ';

                // increment up w/ left & index
                left=obj[kidsIds[ind]].x + obj[kidsIds[ind]].width;
                ind++;

            }
        }

        if (parent.toString().includes('contCol')){

        var kidsIds = obj[parentId].children; // row then sort by y
            kidsIds=kidsIds.sort((a,b) => { //horizons sorted
              return obj[a].y - obj[b].y
            });

        var ind=0;
        var above=obj[parentId].y;

          while (ind<kidsIds.length){ //for each row... must correct the last row catch
              console.log('setting Row margings: ',obj[kidsIds[ind]] );

              var below=obj[kidsIds[ind]].y;
              var mT=(Math.floor((below-above)/10))*10; //adjust spacing later
              //(mT<10)? mT=10 : mT=mT;
              //950x500, 1440x760 display at ratio...1.5 times spacing
              //

              var L = (obj[kidsIds[ind]].x-obj[parentId].x);
              var R = (obj[parentId].x+obj[parentId].width) - (obj[kidsIds[ind]].x+obj[kidsIds[ind]].width);
              var C = (obj[parentId].x+obj[parentId].width/2) - (obj[kidsIds[ind]].x+obj[kidsIds[ind]].width/2);

              var align=''
              if (!C || !L || !R){
                if(!C){align=' selfCenter'};
                if(!L){align=' selfStart'};
                if(!R){align=' selfEnd'};
              } else {
                align = ' mL'+L+' ';
              }

              //T/R/L margin setting
              obj[kidsIds[ind]].css = obj[kidsIds[ind]].css + 'mT'+mT+align;

              // increment up w/ above & index
              above=obj[kidsIds[ind]].y + obj[kidsIds[ind]].height;
              ind++;

          }

        }

      }

  } //end of formatting check

