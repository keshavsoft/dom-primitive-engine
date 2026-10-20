import { runPipeline, meta } from '../../src/v7/index.js';
import recipe from './form-instructions.json' with { type: 'json' };

console.log(`${meta.name} [${meta.version}] Form initialized.`);
console.log('Form Recipe:', recipe);

const form = document.querySelector('#v7Form');
const output = document.querySelector('#outputResult');

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    // 1. Run pipeline from event.currentTarget (form)
    const formData = runPipeline(event.currentTarget, recipe);

    // 2. Output to browser console
    console.log('Extracted Form Object:', formData);

    // 3. Output to DOM box
    if (output) {
      output.textContent = JSON.stringify(formData, null, 2);
    }
  });
}
