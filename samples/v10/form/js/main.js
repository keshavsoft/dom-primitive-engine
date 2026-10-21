import { extractForm } from "./extractForm.js";

const form = document.querySelector("#person-form");
const output = document.querySelector("#output");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formObject = extractForm(event.submitter ?? form);
  output.textContent = JSON.stringify(formObject, null, 2);
});
