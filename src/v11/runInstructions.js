import runInstruction from "./runInstruction.js";

const runInstructions = (rootElement, instructions, clientData = {}) => {
  let previousResult = rootElement;

  for (const instruction of instructions) {
    previousResult = runInstruction({
      rootElement,
      previousResult,
      instruction,
      clientData
    });
  }

  return previousResult;
};

export default runInstructions;
