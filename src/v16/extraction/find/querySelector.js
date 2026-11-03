const querySelector = (input, args, clientData) => {
  const element = input;
  const selector = args.selector;
  // clientData is not used by this operation.

  if (!element || typeof element.querySelector !== "function") return null;

  return element.querySelector(selector);
};

export default querySelector;

