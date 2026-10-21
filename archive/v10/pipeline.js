import { operations } from "./operations.js";

/** Execute instructions whose input is either the external root or the prior result. */
export const runInstructions = (root, instructions = []) => {
  if (!root) throw new TypeError("V10 requires a root input.");
  if (!Array.isArray(instructions)) throw new TypeError("Instructions must be an array.");

  let previous;

  for (const [index, instruction] of instructions.entries()) {
    if (!instruction || typeof instruction !== "object") {
      throw new TypeError(`Instruction at index ${index} must be an object.`);
    }

    const { sourcePath, func, arguments: args = {} } = instruction;
    const sourceName = sourcePath?.fileName;
    let input;

    if (sourceName === "root") input = root;
    else if (sourceName === "previous") input = previous;
    else throw new Error(`Unsupported sourcePath.fileName '${sourceName}' at instruction ${index}.`);

    const operation = operations[func];
    if (typeof operation !== "function") {
      throw new Error(`Unknown instruction function '${func}' at index ${index}.`);
    }

    previous = operation(input, args);
  }

  return previous;
};
