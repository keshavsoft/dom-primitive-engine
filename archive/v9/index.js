export { runPipeline } from "./pipeline.js";
export { operations } from "./operations.js";
export { closest, queryAll, queryOne } from "./primitives/find.js";
export { readText, readValue, toArray, toObject } from "./primitives/read.js";

export const meta = Object.freeze({
  name: "DOM Primitive Engine",
  version: "V9.0.0",
  type: "Instruction Registry Pipeline"
});