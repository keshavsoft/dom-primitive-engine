import instructions from "./instructions.json" with { type: "json" };

const clientData = {
  columns: ["serial", "itemName", "category", "baseUnit", "openingRate"],
  options: {}
};

export const extractRow = (clickedElement) =>
  window.ks.domPrimitiveEngine?.runInstructions(clickedElement, instructions, clientData);
