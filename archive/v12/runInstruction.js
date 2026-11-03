import getInput from "./getInput.js";
import getArguments from "./getArguments.js";

const runInstruction = ({ element, previousResult, instruction, clientData, operations }) => {
  const input = getInput({ element, previousResult, instruction, clientData });
  const args = getArguments(instruction, clientData);
  const func = operations[instruction.func];

  return func(input, args, clientData);
};

export default runInstruction;
