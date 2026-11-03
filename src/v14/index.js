import registerGlobal from "./register/index.js";
import { default as runInstructions } from "./runInstructions.js";
import { default as bindEvents } from "./bindEvents/index.js";

export { runInstructions, bindEvents };
export { readRow, readFooter } from "./tableReaders.js";

registerGlobal(runInstructions, bindEvents);
