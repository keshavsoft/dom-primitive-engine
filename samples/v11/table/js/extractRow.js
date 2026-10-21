import { runInstructions } from "../../../../src/index.js";
import instructions from "../instructions.json" with { type: "json" };

const clientData = {
  columns: ["itemName", "category", "price"],
  options: {}
};

export const extractRow = (clickedElement) =>
  runInstructions(clickedElement, instructions, clientData);
