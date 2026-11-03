const getStartInput = (binding, event, matchElement) => {
  if (binding.root === "event" || event?.type?.startsWith("key")) {
    return event;
  }

  return matchElement;
};

export default getStartInput;

