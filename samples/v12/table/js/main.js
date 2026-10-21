import { extractRow } from "./extractRow.js";

const output = document.querySelector("#output");

document.querySelectorAll("[data-extract-row]").forEach((button) => {
  button.addEventListener("click", (event) => {
    output.textContent = JSON.stringify(extractRow(event.currentTarget), null, 2);
  });
});
