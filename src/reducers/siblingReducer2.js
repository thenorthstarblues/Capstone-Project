const test={
  0:{ id:0, height:400, width:460, x:0, y:0, parent:null, children:[1,2,3,4,5,6,7,8,9], tag: 'div', css: 'p10 '},
  1:{id:1, height:200, width:200, x:20, y: 20, parent:0,children:[],tag:'div',css:'p10 '},
  2:{id:2, height:20, width:200, x:240, y:20, parent:0, children:[],tag:'div',css:'p10 '},
  3:{id:3, height:20, width:160, x:240, y:60, parent:0, children:[],tag:'div',css:'p10 '},
  4:{id:4, height:20, width:180, x:240, y:100, parent:0, children:[],tag:'div',css:'p10 '},
  5:{id:5, height:20, width:80, x:300, y:120, parent:0, children:[],tag:'div',css:'p10 '},
  6:{id:6, height:60, width:60, x:20, y:240, parent:0, children:[],tag:'div',css:'p10 '},
  7:{id:7, height:60, width:60, x:100, y:240, parent:0, children:[],tag:'div',css:'p10 '},
  8:{id:8, height:60, width:60, x:180, y:240, parent:0, children:[],tag:'div',css:'p10 '},
  9:{id:9, height:60, width:60, x:260, y:240, parent:0, children:[],tag:'div',css:'p10 '},
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
            columnRowCheck(boxObjs, i, boxObjs[i].children, adds = 0);
        }
    } //done with checks, can return or put resultant object into action creator.

  return boxObjs;
  //   return {
  //   type: SIB_RECOG,
  //   objectsCss:boxObjs,
  // }

});

function columnRowCheck(obj, parentId, childArr, adds = 0){
  // full obj list, 3, [2,5,7,8] as input, adds for iterating through new container ids

  if (childArr.length===0){ // 0 children
    obj[parentId].css = css.none; //no padding here... specific object size
    //no children, do nothing, done
  } else if (childArr.length === 1){ // 1 child

    console.log('only 1 kid');
    //object and its child : set parent to flex wrap (i.e. row)
    //return to this later

  } else { // 2 or more children, recursion here

    // all children, find largest
    let childAreas = childArr.map(child => obj[child].width*obj[child].height );
    let bigKidI = childAreas.indexOf(Math.max(...childAreas));
    let largest = obj[childArr[bigKidI]];

    //grab horizons
    let y0 = largest.y;
    let y1 = largest.y+largest.height;

    // find siblings within those horizons for a row
    const idRow = childArr.filter(child => {
      return (obj[child].y>=y0 && (obj[child].y+obj[child].height)<=y1);
    })

    if (idRow.length){

      console.log(idRow);
      // create new row Div to hold those kids - Q. within and then without recursion

      // within those kids (minus initial largest) :
              // find  next largest see if any column alignment x0, x1

              // cluster new Div

              // final remainders - column check again

    }

    // either done with reorganization or no new row....


    // trim child list down to remainders - recurse thru unchecked children

  } //out of original else

}

findSiblings(test);
