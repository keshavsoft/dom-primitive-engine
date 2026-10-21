export { runPipeline } from './pipeline.js';
export { findClosest, queryAll, queryOne } from './primitives/find.js';
export { readControlValue, collectionToObject } from './primitives/read.js';

export const meta = Object.freeze({
  name: 'DOM Primitive Engine',
  version: 'V6',
  type: 'Dynamic Pipeline'
});
