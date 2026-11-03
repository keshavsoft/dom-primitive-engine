import registerGlobal from "./register/index.js";
import { runInstructions, readRow, readFooter } from "./extraction/index.js";
import { default as bindEvents } from "./bindEvents/index.js";

export { runInstructions, readRow, readFooter };
export { bindEvents };

registerGlobal(runInstructions, bindEvents);
