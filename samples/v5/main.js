import { runInstructions, meta } from '../../src/v5/index.js';
import formConfig from './form-instructions.json';

console.log(`${meta.name} [${meta.version}] ready.`);

const form = document.querySelector('#userForm');
const output = document.querySelector('#outputResult');

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    // 1. Run the instructions starting from event.currentTarget (the form or button)
    const context = runInstructions({
      start: event.currentTarget,
      instructions: formConfig.collectFormInstructions
    });

    // 2. The extracted form object
    const formData = context.data;

    // 3. Log to console as requested
    console.log('Extracted Form Object:', formData);

    // 4. Update the DOM pre element
    if (output) {
      output.textContent = JSON.stringify(formData, null, 2);
    }
  });
}
