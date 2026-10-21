import { operations } from "./operations.js";

/**
 * Run an ordered list of declarative instructions.
 *
 * Example:
 * [
 *   { "op": "closest", "args": { "selector": "tr" } },
 *   { "op": "queryAll", "args": { "selector": "td" } },
 *   { "op": "toObject", "args": { "columns": ["itemName", "category", "price"] } }
 * ]
 */
export const runPipeline = (start, instructions = [], context = {}) => {
  if (!start) throw new TypeError("Pipeline requires a valid start value.");
  if (!Array.isArray(instructions)) {
    throw new TypeError("V9 instructions must be an array.");
  }

  return instructions.reduce((current, instruction, index) => {
    if (!instruction || typeof instruction !== "object") {
      throw new TypeError(`Instruction at index ${index} must be an object.`);
    }
    const { op, args = {} } = instruction;
    const operation = operations[op];
    if (typeof operation !== "function") {
      throw new Error(`Unknown pipeline operation '${op}' at index ${index}.`);
    }
    const result = operation(current, args, context);
    if (op === "closest" && !result) {
      throw new Error(`Pipeline operation closest('${args.selector}') found no element.`);
    }
    return result;
  }, start);
};