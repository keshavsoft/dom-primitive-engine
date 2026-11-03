import meta from "./meta.js";

export const registerGlobal = (runInstructions, { readRow, readFooter } = {}, metadata = meta) => {
    if (!runInstructions || typeof globalThis === "undefined") return;

    globalThis.ks ??= {};

    globalThis.ks.domPrimitiveEngine = {
        meta: metadata,
        runInstructions,
        readRow,
        readFooter
    };

    return globalThis.ks.domPrimitiveEngine;
};

export default registerGlobal;

