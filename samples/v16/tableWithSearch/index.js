import { bindings } from "./events.js";

// Single common source of data and columns
import data from "../common/data.json" with { type: "json" };
import columns from "../common/columns.json" with { type: "json" };

const start = () => {
    try {
        window.ks.jsonRenderers.render({
            type: "table.simple",
            data,
            columns,
            options: {
                showSerial: true,
                showSearch: true,
                showOptions: true
            },
            targetHtmlId: "dom-render-container",
            classToApply: "",
            appendPosition: "replace",
        });

        // Hook all events declaratively to the container
        window.ks.domPrimitiveEngine?.bindEvents("dom-render-container", bindings);

    } catch (err) {
        console.error("Render error:", err);
        const container = document.getElementById("dom-render-container");
        if (container) {
            container.innerHTML = `<div class="alert alert-danger font-monospace small">${err.message}</div>`;
        }
    }
};

start();
