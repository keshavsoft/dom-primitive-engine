import { runInstructions } from "../../../../src/index.js";
import instructions from "../instructions.json" with { type: "json" };

export const extractRow = (clickedElement) => runInstructions(clickedElement, instructions);
