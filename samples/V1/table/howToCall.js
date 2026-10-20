import {runInstructions} from "../../../archive/v1/runInstructions.js";
import {collectRowInstructions,rowCellsInstructions,clickedCellInstructions} from "./instructions.js";
export const collectRow=event=>runInstructions({start:event.currentTarget,instructions:collectRowInstructions}).data;
export const readRowCells=event=>Array.from(runInstructions({start:event.currentTarget,instructions:rowCellsInstructions}).cells,c=>c.textContent.trim());
export const readClickedCell=event=>runInstructions({start:event.currentTarget,instructions:clickedCellInstructions}).text;

export const meta = Object.freeze({ name: "DOM Primitive Engine", version: "V1", instructionFormat: "JavaScript" });
window.DOMPrimitiveEngineV1 = { ...(window.DOMPrimitiveEngineV1 || {}), meta, collectRow, readRowCells, readClickedCell };
