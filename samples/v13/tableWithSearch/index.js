import { extractRow } from "./extractRow.js";

// Single common source of data and columns
import data from "../common/data.json" with { type: "json" };
import columns from "../common/columns.json" with { type: "json" };

const container = document.getElementById("dom-render-container");

const attachEvents = () => {

    const buttons = document.querySelectorAll(".ks-btn-show");
    console.log("buttons : ", buttons);

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const rowData = extractRow(event.currentTarget);

            console.log("rowData : ", rowData);
        });
    });

};

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

        attachEvents();
    } catch (err) {
        console.error("Render error:", err);
        container.innerHTML = `<div class="alert alert-danger font-monospace small">${err.message}</div>`;
    }
};

start();
