import { runInstructions } from "../../../../src/v12/index.js";
import instructions from "../instructions.json" with { type: "json" };

const clientData = {
  data: {},
  columns: [],
  options: {}
};

export const extractForm = (submitElement) =>
  runInstructions(submitElement, instructions, clientData);
