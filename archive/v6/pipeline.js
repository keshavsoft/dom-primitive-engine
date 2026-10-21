import { findClosest, queryAll, queryOne } from './primitives/find.js';
import { readControlValue, collectionToObject } from './primitives/read.js';

/**
 * Runs a dynamic pipeline based on keys present in the config recipe.
 * Only the steps defined in the config are executed.
 * 
 * Example recipe:
 * {
 *   "closest": "form",
 *   "queryAll": "input, select, textarea",
 *   "loop": "toObject"
 * }
 */
export const runPipeline = (start, recipe = {}) => {
  if (!start) throw new TypeError('Pipeline requires a valid start element.');

  let current = start;

  // Step 1: Optional closest traversal (walk up)
  if (recipe.closest) {
    current = findClosest(current, recipe.closest);
    if (!current) {
      throw new Error(`Pipeline error: closest('${recipe.closest}') not found from start element.`);
    }
  }

  // Step 2: Optional queryAll (query collection down)
  if (recipe.queryAll) {
    current = queryAll(current, recipe.queryAll);
  }
  // Step 2b: Optional queryOne (query single element down)
  else if (recipe.queryOne) {
    current = queryOne(current, recipe.queryOne);
    if (!current) return null;
  }

  // Step 3: Optional loop / reduction
  if (recipe.loop === 'toObject') {
    current = collectionToObject(current);
  }

  // Step 4: Optional single value read
  if (recipe.read) {
    current = readControlValue(current);
  }

  return current;
};
