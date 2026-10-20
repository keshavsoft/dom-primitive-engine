import { runPipeline, meta } from '../../src/v6/index.js';
import recipe from './form-instructions.json' with { type: 'json' };

console.log(`${meta.name} [${meta.version}] initialized.`);
console.log('Active Pipeline Recipe:', recipe);

const form = document.querySelector('#simpleForm');
const output = document.querySelector('#outputResult');

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    // 1. Run dynamic pipeline with currentTarget (the form)
    const formData = runPipeline(event.currentTarget, recipe);

    // 2. Output to browser console
    console.log('Extracted Form Object:', formData);

    // 3. Display in DOM output box
    if (output) {
      output.textContent = JSON.stringify(formData, null, 2);
    }
  });
}
