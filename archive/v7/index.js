export { runPipeline } from './pipeline.js';
export { findClosest, queryAll, queryOne } from './primitives/find.js';
export { readControlValue, readText, collectionToObject, collectionToArray } from './primitives/read.js';

export const meta = Object.freeze({
  name: 'DOM Primitive Engine',
  version: 'V7',
  type: 'Dynamic Pipeline'
});
