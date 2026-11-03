import { extractRow } from "./extractRow.js";
import { extractSearch } from "./extractSearch.js";

// Single common source of data and columns
import data from "../common/data.json" with { type: "json" };
import columns from "../common/columns.json" with { type: "json" };

const container = document.getElementById("dom-render-container");

const attachEvents = () => {
    // 1. Table row show buttons
    const buttons = document.querySelectorAll(".ks-btn-show");
    console.log("buttons : ", buttons);

    buttons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const rowData = extractRow(event.currentTarget);

            console.log("rowData : ", rowData);
        });
    });

    // 2. Search input Enter keydown
    const searchInput = container.querySelector("input") || document.querySelector("input[type='search']");
    console.log("searchInput : ", searchInput);

    if (searchInput) {
        searchInput.addEventListener("keydown", (event) => {
            const searchData = extractSearch(event);

            if (searchData) {
                console.log("searchData : ", searchData);
            }
        });
    }
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
