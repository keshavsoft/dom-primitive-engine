import "https://keshavsoft.github.io/dom-primitive-engine/dist/v13/min.js";

// import { runInstructions } from "../../../../src/index.js";
import instructions from "./instructions.json" with { type: "json" };

const clientData = {
  columns: ["itemName", "category", "price"],
  options: {}
};

export const extractRow = (clickedElement) =>
  window.ks.domPrimitiveEngine?.runInstructions(clickedElement, instructions, clientData);