export const collectRowInstructions=[{op:"closest",from:"start",selector:"tr",saveAs:"row",required:true},{op:"queryAll",from:"row",selector:"input,select,textarea",saveAs:"controls"},{op:"controlsToObject",from:"controls",saveAs:"data"}];
export const rowCellsInstructions=[{op:"closest",from:"start",selector:"tr",saveAs:"row",required:true},{op:"queryAll",from:"row",selector:"td",saveAs:"cells"}];
export const clickedCellInstructions=[{op:"closest",from:"start",selector:"td",saveAs:"cell",required:true},{op:"readText",from:"cell",trim:true,saveAs:"text"}];
