import { runPipeline } from "../../../../src/index.js";
import { instructions } from "./contract.js";

export const extractRow = (clickedButton) =>
  runPipeline(clickedButton, instructions);
