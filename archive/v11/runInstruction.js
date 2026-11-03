import getInput from "./getInput.js";
import getFunction from "./getFunction.js";
import getArguments from "./getArguments.js";

const runInstruction = ({ rootElement, previousResult, instruction, clientData }) => {
  const input = getInput({ rootElement, previousResult, instruction, clientData });
  const func = getFunction(instruction);
  const args = getArguments(instruction, clientData);

  return func(input, args, clientData);
};

export default runInstruction;
