const test={
  0:{ id:0, height:400, width:800, x:0, y:0, parent:null, children:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17], tag: 'div', css: 'p10 '},
  1:{id:1, height:200, width:200, x:20, y: 20, parent:0,children:[],tag:'div',css:'p10 '},
  2:{id:2, height:20, width:200, x:240, y:20, parent:0, children:[],tag:'div',css:'p10 '},
  3:{id:3, height:20, width:160, x:240, y:60, parent:0, children:[],tag:'div',css:'p10 '},
  4:{id:4, height:20, width:180, x:240, y:100, parent:0, children:[],tag:'div',css:'p10 '},
  5:{id:5, height:20, width:80, x:300, y:120, parent:0, children:[],tag:'div',css:'p10 '},
  10:{id:10, height:20, width:200, x:460, y:20, parent:0, children:[],tag:'div',css:'p10 '},
  11:{id:11, height:20, width:160, x:460, y:60, parent:0, children:[],tag:'div',css:'p10 '},
  12:{id:12, height:20, width:180, x:460, y:100, parent:0, children:[],tag:'div',css:'p10 '},
  13:{id:13, height:20, width:80, x:460, y:120, parent:0, children:[],tag:'div',css:'p10 '},
  6:{id:6, height:60, width:60, x:20, y:240, parent:0, children:[],tag:'div',css:'p10 '},
  7:{id:7, height:60, width:60, x:100, y:240, parent:0, children:[],tag:'div',css:'p10 '},
  8:{id:8, height:60, width:60, x:180, y:240, parent:0, children:[],tag:'div',css:'p10 '},
  9:{id:9, height:60, width:60, x:260, y:240, parent:0, children:[],tag:'div',css:'p10 '},
  14:{id:6, height:60, width:60, x:20, y:320, parent:0, children:[],tag:'div',css:'p10 '},
  15:{id:7, height:60, width:60, x:100, y:320, parent:0, children:[],tag:'div',css:'p10 '},
  16:{id:8, height:20, width:60, x:180, y:320, parent:0, children:[],tag:'div',css:'p10 '},
  17:{id:9, height:20, width:60, x:260, y:350, parent:0, children:[],tag:'div',css:'p10 '},
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

    for (let i=0; i<len.length; i++){ //do class positions

          if (boxObjs[i]){ //originals are numbers, so will only iterate through originals
              console.log(i, 'classCheck');
              //classCheck();
          }
      }

  return boxObjs;
  //   return {
  //   type: SIB_RECOG,
  //   objectsCss:boxObjs,
  // }

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


// testing only
findSiblings(test);
