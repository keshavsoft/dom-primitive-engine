import runInstructions from "../extraction/index.js";
import getStartInput from "./getStartInput.js";
import getClientData from "./getClientData.js";

const executeBinding = ({ binding, event, matchElement }) => {
  const startInput = getStartInput(binding, event, matchElement);
  const clientData = getClientData(binding, event, matchElement);
  const runner = binding.runner ?? runInstructions;

  const result = runner(startInput, binding.instructions, clientData);

  if (result !== null && result !== undefined && typeof binding.onExtract === "function") {
    binding.onExtract(result, event, matchElement);
  }

  return result;
};

export default executeBinding;

