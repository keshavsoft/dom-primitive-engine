import runInstruction from "./runInstruction/index.js";
import * as find from "./find/index.js";
import * as read from "./read/index.js";

const operations = { ...find, ...read };

const runInstructions = (element, instructions, clientData = {}) => {
  let previousResult = element;

  for (const instruction of instructions) {
    previousResult = runInstruction({
      element,
      previousResult,
      instruction,
      clientData,
      operations
    });
  }

  return previousResult;
};

export default runInstructions;
