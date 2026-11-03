import bindings from "./bindings.json" with { type: "json" };
import instructions from "./instructions.json" with { type: "json" };
import searchInstructions from "./searchInstructions.json" with { type: "json" };
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
      appendPosition: "replace"
    });

    const logBox = document.getElementById("dom-extract-log");

    const configuredBindings = bindings.map((binding) => ({
      ...binding,
      onExtract: (result, event, matchElement) => {
        if (binding.event === "click") {
          const rowData = window.ks.domPrimitiveEngine?.runInstructions(
            matchElement,
            instructions,
            { columns: ["serial", "itemName", "category", "baseUnit", "openingRate"] }
          );

          console.log("Extracted Row Data via dom-primitive-engine:", rowData);
          if (logBox) {
            logBox.innerHTML = `Extracted Row via <span class="text-success">dom-primitive-engine</span>: <span class="text-warning">${JSON.stringify(rowData)}</span>`;
          }
          return;
        }

        if (binding.event === "keydown") {
          const searchResult = window.ks.domPrimitiveEngine?.runInstructions(
            event,
            searchInstructions
          );

          if (searchResult !== null && searchResult !== undefined) {
            const payload = { searchQuery: searchResult, timestamp: new Date().toLocaleTimeString() };
            console.log("Extracted Search via dom-primitive-engine:", payload);
            if (logBox) {
              logBox.innerHTML = `Extracted Search via <span class="text-success">dom-primitive-engine</span>: <span class="text-info">${JSON.stringify(payload)}</span>`;
            }
          }
        }
      }
    }));

    window.ks.domPrimitiveBindings?.bindEvents("dom-render-container", configuredBindings);

  } catch (err) {
    console.error("Render error:", err);
    const container = document.getElementById("dom-render-container");
    if (container) {
      container.innerHTML = `<div class="alert alert-danger font-monospace small">${err.message}</div>`;
    }
  }
};

start();

