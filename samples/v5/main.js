import { runInstructions, meta } from '../../src/v5/index.js';
import formConfig from './form-instructions.json';

console.log(`${meta.name} [${meta.version}] ready.`);

const form = document.querySelector('#userForm');
const output = document.querySelector('#outputResult');

if (form) {
  form.addEventListener('submit', event => {
    event.preventDefault();

    const context = runInstructions({
      start: event.currentTarget,
      instructions: formConfig.collectFormInstructions
    });

    const formData = context.data;
    console.log('Extracted Form Object:', formData);

    if (output) {
      output.textContent = JSON.stringify(formData, null, 2);
    }
  });
}
