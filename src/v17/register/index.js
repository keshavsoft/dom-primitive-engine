import meta from "./meta.js";

export const registerGlobal = (runInstructions, bindEvents, metadata = meta) => {
    if (!runInstructions || typeof globalThis === "undefined") return;

    globalThis.ks ??= {};

    globalThis.ks.domPrimitiveEngine = {
        meta: metadata,
        runInstructions,
        bindEvents
    };

    return globalThis.ks.domPrimitiveEngine;
};

export default registerGlobal;
