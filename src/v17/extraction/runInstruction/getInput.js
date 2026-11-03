const getInput = ({ element, previousResult, instruction, clientData }) => {
  const source = instruction.sourcePath.fileName;

  if (source === "root") return element;
  if (source === "previous") return previousResult;
  if (source === "clientData") return clientData;
};

export default getInput;
