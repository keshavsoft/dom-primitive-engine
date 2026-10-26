import "https://keshavsoft.github.io/json-renderers/dist/v21/min.js";
// import render from "../../src/index.js";
import { readRow, readFooter } from "./methods/tableEvents.js";

const container = document.getElementById("table-container");
const output = document.getElementById("event-result");

const columns = [
  { columnName: "itemName" },
  { columnName: "baseUnit" }
];

const data = [
  { itemName: "Shading Net", baseUnit: "kgs" },
  { itemName: "Nylon Rope", baseUnit: "meters" },
  { itemName: "Water Proof Tape", baseUnit: "rolls" }
];

window.ks.jsonRenderers.render({
  targetHtmlId: "table-container",
  appendPosition: "",
  type: "table.withFooter",
  classToApply: "",
  columns,
  data,
  options: {
    showOptions: [{ label: "Options", type: "button" }],
    showFooter: true,
    showFooterSave: true
  }
});

container.addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button || !container.contains(button)) return;

  const label = button.textContent.trim().toLowerCase();

  try {
    if (label === "save") {
      const result = readFooter(button);
      output.textContent = JSON.stringify({ action: "footer-save", data: result }, null, 2);
      return;
    }

    if (label === "show") {
      const result = readRow(button, columns.map(column => column.columnName));
      output.textContent = JSON.stringify({ action: "row-options", data: result }, null, 2);
    }
  } catch (error) {
    output.textContent = `${error.name}: ${error.message}`;
    console.error(error);
  }
});
