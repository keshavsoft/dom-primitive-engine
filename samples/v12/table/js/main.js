import { extractRow } from "./extractRow.js";

const output = document.querySelector("#output");

const buttons = document.querySelectorAll("[data-extract-row]");
console.log("buttons : ", buttons);

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    output.textContent = JSON.stringify(extractRow(event.currentTarget), null, 2);
  });
});