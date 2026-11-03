const querySelectorAll = (input, args, clientData) => {
  const element = input;
  const selector = args.selector;
  // clientData is not used by this operation.

  const matchingElements = Array.from(element.querySelectorAll(selector));

  return matchingElements;
};

export default querySelectorAll;
