import { closest, queryAll, queryOne } from "./primitives/find.js";
import { readText, readValue, toArray, toObject } from "./primitives/read.js";

/**
 * Each operation receives the current pipeline value and operation arguments.
 * Keep this registry as the single dispatch table for instruction execution.
 */
export const operations = Object.freeze({
  closest: (current, args = {}) => closest(current, args.selector),
  queryAll: (current, args = {}) => queryAll(current, args.selector),
  queryOne: (current, args = {}) => queryOne(current, args.selector),
  readText: (current, args = {}) => readText(current, args),
  readValue: (current) => readValue(current),
  toArray: (current, args = {}) => toArray(current, args),
  toObject: (current, args = {}) => toObject(current, args)
});