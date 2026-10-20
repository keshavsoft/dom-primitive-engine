import {runInstructions} from "../../src/runInstructions.js";
import {collectFormInstructions,emailInstructions} from "./instructions.js";
export const collectFormData=event=>runInstructions({start:event.currentTarget,instructions:collectFormInstructions}).data;
export const readEmail=event=>runInstructions({start:event.currentTarget,instructions:emailInstructions}).value;
