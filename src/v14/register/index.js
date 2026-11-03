import meta from "./meta.js";

export const registerGlobal = (runInstructions, metadata = meta) => {
    if (!runInstructions || typeof globalThis === "undefined") return;

    globalThis.ks ??= {};

    globalThis.ks.domPrimitiveEngine = {
        meta: metadata,
        runInstructions
    };

    return globalThis.ks.domPrimitiveEngine;
};

export default registerGlobal;