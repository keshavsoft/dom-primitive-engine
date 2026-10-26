const getArguments = (instruction, clientData) => {
  const instructionArguments = instruction.arguments ?? {};
  const columns = instructionArguments.columns ?? clientData.columns;
  const options = instructionArguments.options ?? clientData.options;
  const data = instructionArguments.data ?? clientData.data;

  return { ...instructionArguments, columns, options, data };
};

export default getArguments;
