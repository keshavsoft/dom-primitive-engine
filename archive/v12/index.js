export { default as runInstructions } from "./runInstructions.js";
export * from "./find/index.js";
export * from "./read/index.js";
export { readRow, readFooter } from "./tableReaders.js";

export const meta = Object.freeze({
  name: "DOM Primitive Engine",
  version: "V12.0.0",
  type: "Client Data Instruction Pipeline"
});
