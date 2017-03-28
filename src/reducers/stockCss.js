


export const theCss={  /* potential object that has key value of what each class name's property does */

  'flexRow' : 'display: -webkit-flex;display: flex;-webkit-flex-direction: row; flex-direction: row;',
  'flexCol' : 'display: -webkit-flex;display: flex;-webkit-flex-direction: column;   flex-direction: column;',
  /* adjust row or col with these class="flexCol start" or class="flexRow start" */

  /* not incorporating flex-direction reversals, flex-wrap, flex-flow, or align-content (as it treats multi-row wraps)
  the order we can set and detecting true wrap would be more math */

  /* JUSTIFY CONTENTS */

  'left' : '-webkit-justify-content: flex-start; justify-content: flex-start;',
   /* left for rows */
  'right' : '-webkit-justify-content: flex-end; justify-content: flex-end;',
  /* right for rows */
  'center' : '-webkit-justify-content: center; justify-content: center;',
   /* center row */
  'centerAround' : '-webkit-justify-content: space-around;justify-content: space-around;',
  /* equal buffers row */
  'centerBetween' : '-webkit-justify-content: space-between;justify-content: space-between;',
    /* to edges, space between row */

    /* ALIGN ITEMS */
  'startVert': '-webkit-align-items: flex-start;align-items: flex-start;',
    /* top for row, left for column */

  'endVert' : '-webkit-align-items: flex-end;align-items: flex-end;',
    /* bottom for row, right for column */

  'centerVert' : '-webkit-align-items: center;align-items: center;',
     /* center row vertically */

  'stretchVert' : '-webkit-align-items: stretch;align-items: stretch;',
      /* fills space top to bottom */

  'baselineVert' : '-webkit-align-items: baseline;align-items: baseline;',
     /* around baseline */



  /* A BIT OF FLEX GOES ON THE OBJECT ITSELF */
  /* --------------- child css --------------- */

  /* I don't use these much - in terms of grow or shrink -
  and since we're setting child sizes, we won't need anything more than their odd alignment */

  'selfStart': '-webkit-align-self: flex-start;align-self:flex-start;',
  'selfEnd': '-webkit-align-self: flex-end;align-self:flex-end;',
  'selfCenter': '-webkit-align-self: center;lign-self:center;',
  'selfBase': '-webkit-align-self: baseline; align-self: baseline;',
  'selfStretch' : '-webkit-align-self: stretch;align-self:stretch;',

  //other classes

  'invisDiv': 'border: none; background-color: none;',
}
