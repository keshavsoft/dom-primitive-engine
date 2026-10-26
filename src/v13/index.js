import registerGlobal from "./register/index.js";
import { default as runInstructions } from "./runInstructions.js";

export { runInstructions };
export { readRow, readFooter } from "./tableReaders.js";

registerGlobal(runInstructions);