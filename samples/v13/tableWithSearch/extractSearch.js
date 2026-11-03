import instructions from "./searchInstructions.json" with { type: "json" };

const clientData = {
  onSearch: (searchTerm) => ({
    searchQuery: searchTerm,
    timestamp: new Date().toLocaleTimeString()
  })
};

export const extractSearch = (event) =>
  window.ks.domPrimitiveEngine?.runInstructions(event, instructions, clientData);

