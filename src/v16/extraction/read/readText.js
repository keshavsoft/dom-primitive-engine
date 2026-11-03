const readText = (input, args, clientData) => {
  const element = input;
  const trim = args.trim ?? true;
  // clientData is not used by this operation.

  const text = element.textContent ?? "";
  const value = trim ? text.trim() : text;

  return value;
};

export default readText;
