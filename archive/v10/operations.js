import { closest, querySelectorAll } from "./find.js";
import { mapNamedValues, mapValues, readText, readValue } from "./read.js";

export const operations = Object.freeze({
  closest: (input, args = {}) => closest(input, args.selector),
  querySelectorAll: (input, args = {}) => querySelectorAll(input, args.selector),
  mapValues: (input, args = {}) => mapValues(input, args),
  mapNamedValues: (input) => mapNamedValues(input),
  readText: (input, args = {}) => readText(input, args),
  readValue: (input) => readValue(input)
});
