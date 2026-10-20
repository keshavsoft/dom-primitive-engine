import {runInstructions} from "../../src/runInstructions.js";
import {collectRowInstructions,rowCellsInstructions,clickedCellInstructions} from "./instructions.js";
export const collectRow=event=>runInstructions({start:event.currentTarget,instructions:collectRowInstructions}).data;
export const readRowCells=event=>Array.from(runInstructions({start:event.currentTarget,instructions:rowCellsInstructions}).cells,c=>c.textContent.trim());
export const readClickedCell=event=>runInstructions({start:event.currentTarget,instructions:clickedCellInstructions}).text;
