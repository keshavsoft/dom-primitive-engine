import registerGlobal from "./register/index.js";
import { runInstructions, readRow, readFooter } from "./extraction/index.js";

export { runInstructions, readRow, readFooter };
export default runInstructions;

registerGlobal(runInstructions, { readRow, readFooter });
