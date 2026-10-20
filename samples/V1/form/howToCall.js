import {runInstructions} from "../../../archive/v1/runInstructions.js";
import {collectFormInstructions,emailInstructions} from "./instructions.js";
export const collectFormData=event=>runInstructions({start:event.currentTarget,instructions:collectFormInstructions}).data;
export const readEmail=event=>runInstructions({start:event.currentTarget,instructions:emailInstructions}).value;

export const meta = Object.freeze({ name: "DOM Primitive Engine", version: "V1", instructionFormat: "JavaScript" });
window.DOMPrimitiveEngineV1 = { meta, collectFormData, readEmail };
