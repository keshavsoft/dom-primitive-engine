import { findClosest, queryAll, queryOne } from './primitives/find.js';
import { readControlValue, readText, collectionToObject, collectionToArray } from './primitives/read.js';

/**
 * Runs a dynamic pipeline based on declarative recipe keys.
 * Only the steps defined in the recipe are executed.
 * 
 * Supported recipe keys:
 * - closest: string (selector to walk up from start)
 * - queryAll: string (selector to find multiple children)
 * - queryOne: string (selector to find single child)
 * - loop: 'toObject' | 'toArray' (transforms collection)
 * - read: 'value' | 'text' (reads single element)
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

  // Step 2: Optional queryAll (query multiple children)
  if (recipe.queryAll) {
    current = queryAll(current, recipe.queryAll);
  }
  // Step 2b: Optional queryOne (query single child)
  else if (recipe.queryOne) {
    current = queryOne(current, recipe.queryOne);
    if (!current) return null;
  }

  // Step 3: Optional collection transformation
  if (recipe.loop === 'toObject') {
    current = collectionToObject(current);
  } else if (recipe.loop === 'toArray') {
    current = collectionToArray(current);
  }

  // Step 4: Optional single element read
  if (recipe.read === 'text') {
    current = readText(current);
  } else if (recipe.read === 'value') {
    current = readControlValue(current);
  }

  return current;
};
