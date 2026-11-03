import instructions from "./instructions.json" with { type: "json" };

const clientData = {
  columns: ["itemName", "category", "price"],
  options: {}
};

export const extractRow = (clickedElement) =>
  window.ks.domPrimitiveEngine?.runInstructions(clickedElement, instructions, clientData);