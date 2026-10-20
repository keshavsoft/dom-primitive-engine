import { runPipeline, meta } from '../../../src/v8/index.js';
import recipe from './instructions.json' with { type: 'json' };

console.log(`${meta.name} [${meta.version}] Form initialized.`);
console.log('Active Form Recipe:', recipe);

const form = document.querySelector('#v8UserForm');
const output = document.querySelector('#outputResult');

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    // 1. Run pipeline from form element
    const formData = runPipeline(event.currentTarget, recipe);

    // 2. Output to browser console
    console.log('V8 Extracted Form Object:', formData);

    // 3. Display in DOM output box
    if (output) {
      output.textContent = JSON.stringify(formData, null, 2);
    }
  });
}
