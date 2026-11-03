const getInput = ({ rootElement, previousResult, instruction, clientData }) => {
  const source = instruction.sourcePath.fileName;

  if (source === "root") return rootElement;
  if (source === "previous") return previousResult;
  if (source === "clientData") return clientData;
};

export default getInput;
