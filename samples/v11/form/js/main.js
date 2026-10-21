import { extractForm } from "./extractForm.js";

const form = document.querySelector("#person-form");
const output = document.querySelector("#output");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  output.textContent = JSON.stringify(extractForm(event.submitter ?? form), null, 2);
});
