import { runInstructions } from "../../../../src/index.js";
import instructions from "../instructions.json" with { type: "json" };

const clientData = {
  data: {},
  columns: [],
  options: {}
};

export const extractForm = (submitElement) =>
  runInstructions(submitElement, instructions, clientData);
