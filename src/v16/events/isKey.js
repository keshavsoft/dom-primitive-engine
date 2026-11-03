const isKey = (input, args, clientData) => {
  const targetKey = args?.key ?? "Enter";

  // Check if input itself is a KeyboardEvent or event-like object
  const event = (input && typeof input === "object" && "key" in input)
    ? input
    : args?.event ?? clientData?.event;

  if (!event || event.key !== targetKey) {
    return null;
  }

  // Return the element that triggered the key event (or original input if element)
  return event.target ?? event.currentTarget ?? input;
};

export default isKey;

