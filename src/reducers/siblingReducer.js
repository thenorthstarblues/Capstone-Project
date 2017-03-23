//testingOnly folder for some fake initial data;
import {dummyData0, dummyData1} from './dummyLayoutData.js';

//also, just testing;
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


export const SIB_RECOG = 'SIB_RECOG';

//---------------------------action creator---------------------------

export const findSiblings = (objects => { // one giant object, with each id-object as held

  const boxObjs=Object.assign({}, objects); //clone and begin manipulation
  let len=Object.keys(boxObjs);

  //add function below and include here...
    for (let i=0; i<len.length; i++){

        if (boxObjs[i]){ //originals are numbers, so will only iterate through originals
            columnRowCheck(boxObjs, i, boxObjs[i].children, adds = 0);
        }
    } //done with checks, can return or


  return {
    type: SIB_RECOG,
    boxesCss:boxObjs,
  }

});


//-----------------------initial state ...stuffing state------------

//const initialState = test; // just for initial testing

const initialState = {
  boxes:[],
  boxesCss:[],
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


/* our object-list in the store is an adjacent list of directed connections
looping over it will be simple recursion */

//starting with single row testing

/////////////////////////////POSITION CHECKING//////////////////////////////////


const css={ //incorporate margins/padding later as string concat / string replace
  start:'flexCol startVert ',
  center:'flexCol centerVert ',
  end:'flexCol endVert ',
  top:'flexRow startVert ',
  middle:'flexRow centerVert ',
  bottom:'flexRow endVert ',
  none: 'in-line',
}

let alignCol={
  0: ['startSelf', 'start'],
  1: ['centerSelf', 'start'],
  2: ['endSelf', 'start'],
  3: ['startSelf', 'start'],
  4: ['startSelf', 'start'],
  5: ['startSelf', 'start'],
}

let alignRow={ //for Row child placements/alignments
  0: ['startSelf', 'left'],
  1: ['startSelf', 'center'],
  2: ['startSelf', 'right'],
  3: ['startSelf', 'left'],
  4: ['centerSelf', 'center'],
  5: ['endSelf', 'right'],
}

let alignWrap={ //for boxes without specifications... Make a WARP ROW child placements/alignments
  0: ['startSelf', 'flex wrap left'],
  1: ['startSelf', 'flex wrap center'],
  2: ['startSelf', 'flex wrap right'],
  3: ['startSelf', 'flex wrap '],
  4: ['centerSelf', 'flex wrap '],
  5: ['endSelf', 'flex wrap '],
}


function columnRowCheck(obj, parentId, childA, adds = 0){
  // full obj list, 3, [2,5,7,8] as input, adds for iterating through new container ids
  let childArr=childA.filter(child=>typeof child === 'number');

  if (!childArr){
    //simply set css to 'in-line';
    obj[parentId].css = obj[parentId].css + css.none;
    //no children, do nothing, done
  } else if (childArr.length === 1){

    //get left, center, right, top, middle, bottom
    let [parentPos, childPos] = pairPositions(obj,parentId,childArr[0]);


    console.log('testing ', parentId, parentId.css ,childArr[0], childArr[0].css);


  } else { //all longer children arrays... recursion below.

  //START BY CHECKING POSITIONS-----------------------------------------------------------
      let setA=positions(obj,childArr); //get all those x/y points, #repeats, repeat indexes

      //where are the clusters forming? spread arrays to check
      let clusterSize = [setA.start[1],setA.center[1],setA.end[1], setA.tops[1],setA.middle[1],setA.bottoms[1]];
      let clusterArr = [setA.start[2],setA.center[2],setA.end[2], setA.tops[2],setA.middle[2],setA.bottoms[2]];
      let clusterAlign = [css.start, css.center, css.end, css.top,css.middle,css.bottom];

      //pull out the largest array to make new div for alignment
      let startGroupCnt = Math.max(...clusterSize); //largest cluster
      let currentAlign=clusterAlign[clusterSize.indexOf(+startGroupCnt)]; //its' alignment
      let startGroup = clusterArr[clusterSize.indexOf(+startGroupCnt)]; //grab that group of child indexex

      let currentChildren=childArr.map(child=>obj[child]);
      let currentGroup=startGroup.map(ind=>currentChildren[ind]);
      //this is now the working group as objArray

      //TAKE LARGEST CLUSTER & ALIGNMENT INFO ...
      if (currentGroup.length === childArr.length) { //same as starting children, no new Div
          obj[parentId].css += currentAlign;

      } else if  (currentGroup.length < childArr.length) { //subArr as cluster...give it a new Div
          adds++;

          let remains = insertDiv(currentGroup, obj, parentId, childArr, adds, currentAlign);
            //returns newDiv obj and revised ChildArr....as arr[0] and arr[1];
          console.log('new obj: ', remains[0]);
          console.log(obj[parentId].children); //updated master obj

          if (remains[1].length>=1){ //recurse here as long as subgroup exists
            return columnRowCheck(obj, parentId, obj[parentId].children, adds);
          }

      }// done

  }//out of recusion/initial keyed object... do nothing if in a forEach structure...

};

function repeats(posArr){ //checking for multiples in positions
      let holdI={};
      let cnt=0;
      let current=0;

      posArr.forEach((pos,i)=>{ //cache repeated positions
        if (holdI[pos]){
          holdI[pos].push(i);
        } else {
          holdI[pos]=[i];
        }
      })

      for (let key in holdI){ //repeated count
        if (holdI[key].length>cnt){cnt=holdI[key].length; current=key}
      }

      return [cnt, holdI[current]];
}

function positions(obj,childArr){ // literal positions, repeats, index within childArr
  let start=childArr.map(childId => obj[childId].x);
  let center=childArr.map(childId => (obj[childId].x + obj[childId].width/2));
  let end = childArr.map(childId => (obj[childId].x + obj[childId].width));
  let top = childArr.map(childId => obj[childId].y);
  let middle = childArr.map(childId => (obj[childId].y + obj[childId].height/2));
  let bottom = childArr.map(childId => (obj[childId].y + obj[childId].height));

  return { //baseline info for decision to match
    start : [start, repeats(start)[0], repeats(start)[1]],
    center : [center,repeats(center)[0], repeats(center)[1]],
    end : [end, repeats(end)[0], repeats(end)[1]],
    tops : [top, repeats(top)[0], repeats(top)[1]],
    middle : [middle, repeats(middle)[0], repeats(middle)[1]],
    bottoms : [bottom,repeats(bottom)[0], repeats(bottom)[1]],
  };
}

function pairPositions(obj,parentId,childId){
    let parentPos = [obj[parentId].x, obj[parentId].x+obj[parentId].width/2 ,obj[parentId].x+obj[parentId].width, obj[parentId].y, obj[parentId].y+obj[parentId].height/2, obj[parentId].y+obj[parentId].height];

    let childPos = [obj[childId].x, obj[childId].x+obj[childId].width/2, obj[childId].x+obj[childId].width, obj[childId].y, obj[childId].y+obj[childId].height/2, obj[childId].y+obj[childId].height];

    let diff = parentPos.map((pos,i)=>{
      return childPos[i]-pos;
    })

    let space= Math.min(...diff);
    let alignI = diff.indexOf(space);

    let environ=obj[parentId].css;
    if (environ.includes('flexCol')){ //starts as column
      let vals= alignCol[alignI];

    } else if (environ.includes('flexRow')){
      let vals= alignRow[alignI];

    } else { //nothing set yet

    //what else can I check here ?????

    }


    return [parentPos, childPos];
}



function childChecks(currGroupId, obj, childArr, posArr){ //positional heavy lifting

   let kidArr=childArr.slice(); //clone for a few checks
      currGroupId.forEach(kid=>{ //the children not choosen
        kidArr.splice(kidArr.indexOf(kid),1);
      })

      let mods=[];
      kidArr.forEach(outKid=> { //confirm no overlaps or entirely inside
        let test=obj[outKid];

        if (test.x+test.width < posArr[0] || test.x >posArr[1] || test.y+test.height < posArr[2] || test.y > posArr[3]){ //entirely outside do nothing;
          console.log('outside');

        } else if (test.x >= posArr[0] && test.x+test.width <= posArr[1] && test.y >= posArr[2] && test.y +test.height <= posArr[3]){ //inside so add to group
          currGroupId.push(outKid);
          mods.push(outKid);
          //need to check for alternate alignment here...

        } else if (test.x >= posArr[0] && test.x+test.width <= posArr[1]) { //with column, but lower
          console.log('column')
          currGroupId.push(outKid);
          mods.push(outKid);

          //reset new div bounds
          if (test.y <= posArr[2]){ //higher than
            posArr[2]=test.y;
          } else if (test.y+test.height >= posArr[3]){ //lower than
            posArr[3]=test.y+test.height;
          }

          //need to check for alternate alignment here...

        } else if (test.y >= posArr[2] && test.y +test.height <= posArr[3]) { //with row, but wider
          console.log('row')
          currGroupId.push(outKid);
          mods.push(outKid);

          //reset new div bounds
          if (test.x <= posArr[0]){ //left of, reset
            posArr[0]=test.x;
          } else if (test.x+test.width >= posArr[1]){ //right of, reset
            posArr[1]=test.x+test.width;
          }

          //need to check for alternate alignment here...

        } else { //no overlaps or half overlaps... worse case scenarios.
          console.log('damn', test.id) //how to work back from this...
        }

      });

      if (mods){
        mods.forEach(mod=>{
          kidArr.splice(kidArr.indexOf(mod),1);
        })
      }

      return [posArr, kidArr, currGroupId];
};


function insertDiv(currGroup, obj, parentId, childArr, adds, currAlign){

      //grabIDs...useful later
      let kids = currGroup.map(child => child.id); //actual childIds...for main object list

      //confirm positions to compare/span
      let posit = positions(obj,kids);

      //grab corners for new div (could also use positions)
      let x0= Math.min(...posit.start[0]);
      let x1= Math.max(...posit.end[0]);
      let y0= Math.min(...posit.tops[0]);
      let y1= Math.max(...posit.bottoms[0]);
      let posArr=[x0,x1,y0,y1];

      //------------checking for non-edge children-------------------
      let res=childChecks(kids, obj, childArr, posArr);

      let kidArr = res[1]; //outside children
          posArr = res[0]; //new div bounds
          kids = res[2]; //children within bounds
          x0=posArr[0]; x1=posArr[1];y0=posArr[2]; y1=posArr[3];

      //------------checking for children spacing, finer css quals------------

          //argh the question of internal spacing.... be it between or literal margins

      //-------external alignment between new div and parents - ? padding, etc.

          // argh the question of external spacing.... as above, just simplier 2 object check.

      //------------------create new div--------------------------------------

      let divId='Container'+parentId+'.'+adds;
      obj[divId] = { //all new container divs start with 'container'
        id: divId,
        height:y1-y0,
        width:x1-x0,
        x:x0,
        y:y0,
        parent: parentId, //reference current parent
        children: kids, //set children
        tag: 'div',
        css: currAlign,
      };

      obj[parentId].children.push(divId); //add new Div to parent's children

      kids.forEach(kid=>{
        let oldIndex=obj[parentId].children.indexOf(kid); //find & remove old objects from parent's children
        if (oldIndex){
            obj[parentId].children.splice(oldIndex, 1);
        }
        obj[kid].parent = divId; //reset it's parent to the new div
      });

    return [obj[divId], kidArr]; //new div as check, remaining list to search
}

//just testing - replit working model
//columnRowCheck(test, 0, test[0].children, adds = 0);






