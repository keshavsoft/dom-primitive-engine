const closest = (input, args, clientData) => {
  const element = input;
  const selector = args.selector;
  // clientData is not used by this operation.

  const matchingElement = element.closest(selector);

  return matchingElement;
};

export default closest;
