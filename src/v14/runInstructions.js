import runInstruction from "./runInstruction/index.js";
import * as find from "./find/index.js";
import * as read from "./read/index.js";
import * as events from "./events/index.js";

const operations = { ...find, ...read, ...events };

const runInstructions = (element, instructions, clientData = {}) => {
  let previousResult = element;

  for (const instruction of instructions) {
    if (previousResult === null) {
      return null;
    }

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
