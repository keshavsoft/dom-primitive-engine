import { runPipeline } from "../../../../src/index.js";
import { instructions } from "./contract.js";

export const extractForm = (submitButton) =>
  runPipeline(submitButton, instructions);
