import "https://keshavsoft.github.io/json-renderers/dist/v19/min.js";
import { runPipeline, meta } from "../../../src/v8/index.js";
import recipes from "./instructions.json" with { type: "json" };

const data = [
  { itemName: "Keyboard", category: "Accessories" },
  { itemName: "Krishna Mouse", category: "Accessories" },
  { itemName: "Monitor", category: "Displays" },
  { itemName: "KeshavSoft Laptop", category: "Computers" },
  { itemName: "USB Cable", category: "Accessories" }
];

const columns = [
  { columnName: "itemName", width: "60%" },
  { columnName: "category", width: "40%" }
];

const tableOptions = {
  showSerial: true,
  showOptions: true
};

const tableContainer = document.querySelector("#dom-render-container");
const status = document.querySelector("#status");
const rowOutput = document.querySelector("#rowOutput");
const footerOutput = document.querySelector("#footerOutput");

const setStatus = (message, type = "info") => {
  if (!status) return;
  status.className = `alert alert-${type} py-2`;
  status.textContent = message;
};

const attachDomListeners = () => {
  const table = tableContainer?.querySelector("table");
  if (!table) throw new Error("The table renderer did not create a table.");

  // Mark data cells so the same row recipe used by the V8 table sample can
  // return a named object, while leaving the serial and options cells out.
  const firstDataCellIndex = tableOptions.showSerial ? 1 : 0;
  table.querySelectorAll("tbody tr").forEach(row => {
    const cells = row.querySelectorAll("td");
    columns.forEach((column, index) => {
      cells[firstDataCellIndex + index]?.setAttribute("data-field", column.columnName);
    });
  });

  // The renderer creates these buttons dynamically, so attach after rendering.
  table.querySelectorAll("tbody button").forEach(button => {
    button.addEventListener("click", event => {
      const rowData = runPipeline(event.currentTarget, recipes.rowRecipe);
      console.log(`${meta.name} extracted row:`, rowData);
      if (rowOutput) rowOutput.textContent = JSON.stringify(rowData, null, 2);
    });
  });

  // Typing or choosing a datalist suggestion updates the footer recipe output.
  table.querySelectorAll("tfoot input[name]").forEach(input => {
    input.addEventListener("input", event => {
      const footerData = runPipeline(event.currentTarget, recipes.footerRecipe);
      console.log(`${meta.name} extracted footer inputs:`, footerData);
      if (footerOutput) footerOutput.textContent = JSON.stringify(footerData, null, 2);
    });
  });

  const footerInputs = Array.from(table.querySelectorAll("tfoot input[list]"));
  const connectedInputs = footerInputs.filter(input =>
    input.list?.id === input.getAttribute("list") && input.list.options.length > 0
  );

  if (footerInputs.length && connectedInputs.length === footerInputs.length) {
    setStatus(`Ready: ${connectedInputs.length} footer inputs are connected to their autocomplete lists. Click a row's show button or type in a footer input.`, "success");
  } else {
    setStatus(`Table is ready, but only ${connectedInputs.length} of ${footerInputs.length} footer inputs have a populated autocomplete list.`, "warning");
  }
};

const start = () => {
  try {
    // Build the table specification using the table renderer.
    window.ks.jsonRenderers.render({
      type: "table.withFooter", columns, data,
      targetHtmlId: "dom-render-container",
      classToApply: "",
      appendPosition: "",
      options: tableOptions
    });

    window.ks.jsonRenderers.render({
      type: "dataList", columns, data,
      targetHtmlId: "dataListsId",
      classToApply: "",
      appendPosition: ""
    });

    attachDomListeners();
  } catch (error) {
    console.error(error);
    setStatus(`Could not build the table sample: ${error.message}`, "danger");
  }
};

start();
