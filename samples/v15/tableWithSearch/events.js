import rowInstructions from "./instructions.json" with { type: "json" };
import searchInstructions from "./searchInstructions.json" with { type: "json" };

export const rowBinding = {
  event: "click",
  selector: ".ks-btn-show",
  instructions: rowInstructions,
  clientData: {
    columns: ["serial", "itemName", "category", "baseUnit", "openingRate"]
  },
  onExtract: (rowData) => {
    console.log("rowData : ", rowData);
  }
};

export const searchBinding = {
  event: "keydown",
  selector: "input[type='search'], input",
  instructions: searchInstructions,
  clientData: {
    onSearch: (searchTerm) => ({
      searchQuery: searchTerm,
      timestamp: new Date().toLocaleTimeString()
    })
  },
  onExtract: (searchData) => {
    console.log("searchData : ", searchData);
  }
};

export const bindings = [rowBinding, searchBinding];

export default bindings;

