import { extractRow } from "./extractRow.js";

const output = document.querySelector("#output");

document.querySelectorAll("[data-extract-row]").forEach((button) => {
  button.addEventListener("click", (event) => {
    const rowObject = extractRow(event.currentTarget);
    output.textContent = JSON.stringify(rowObject, null, 2);
  });
});
