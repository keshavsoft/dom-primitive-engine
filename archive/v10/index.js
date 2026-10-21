export { runInstructions } from "./pipeline.js";
export { operations } from "./operations.js";
export { closest, querySelectorAll } from "./find.js";
export { mapNamedValues, mapValues, readText, readValue } from "./read.js";

export const meta = Object.freeze({
  name: "DOM Primitive Engine",
  version: "V10.0.0",
  type: "Source-Resolved Instruction Pipeline"
});