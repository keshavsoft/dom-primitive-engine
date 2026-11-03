const getClientData = (binding, event, matchElement) => ({
  ...binding.clientData,
  event,
  targetElement: matchElement
});

export default getClientData;

