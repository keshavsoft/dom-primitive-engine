const getArguments = (instruction, clientData) => {
  const args = instruction.arguments ?? {};

  return {
    ...args,
    columns: args.columns ?? clientData?.columns,
    options: args.options ?? clientData?.options,
    data: args.data ?? clientData?.data
  };
};

export default getArguments;
