
export const theCss={  /* potential object that has key value of what each class name's property does */

  /* ---------- padding for parents ----------- */
  'p10': 'padding:10px;',
  'p20': 'padding:20px;',
  'p30':'padding:30px;',
  'p40': 'padding:40px;',
  'p50': 'padding:50px;',
  'p60': 'padding:60px;',
  'p70': 'padding:70px;',
  'p80': 'padding:80px;',
  'p90': 'padding:90px;',
  'p100': 'padding:100px;',
  /* ----margins for wildly placed children--- */
  'm10': 'margin:10px;',
  'm20': 'margin:20px;',
  'm30': 'margin:30px;',
  'm40': 'margin:40px;',
  'm50': 'margin:50px;',
  'm60': 'margin:60px;',
  'm70': 'margin:70px;',
  'm80': 'margin:80px;',
  'm90': 'margin:90px;',
  'm100': 'margin:100px',
  /* MOST OF FLEX GOES ON CONTAINER DIV */
  /* ------------ parent css ------------*/

  'container-fluid': 'grab from bootstrap',

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

  startSelf: '-webkit-align-self: flex-start;align-self:flex-start;',
  endSelf: '-webkit-align-self: flex-end;align-self:flex-end;',
  centerSelf: '-webkit-align-self: center;lign-self:center;',
  baseSelf: '-webkit-align-self: baseline; align-self: baseline;',
  stretchSelf: '-webkit-align-self: stretch;align-self:stretch;',
}
