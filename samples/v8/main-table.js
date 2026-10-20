import { runPipeline, meta } from '../../src/v7/index.js';
import tableConfig from './table-instructions.json' with { type: 'json' };

console.log(`${meta.name} [${meta.version}] Table Engine ready.`);
console.log('Table Recipes:', tableConfig);

const rowOutput = document.querySelector('#rowOutput');
const footerOutput = document.querySelector('#footerOutput');

// 1. Read Row: Attached to each row's button
const rowButtons = document.querySelectorAll('.btn-read-row');
rowButtons.forEach(btn => {
  btn.addEventListener('click', event => {
    // Pipeline: button -> closest 'tr' -> queryAll 'td[data-field]' -> toObject
    const rowData = runPipeline(event.currentTarget, tableConfig.rowRecipe);

    console.log('Extracted Row Object:', rowData);

    if (rowOutput) {
      rowOutput.textContent = JSON.stringify(rowData, null, 2);
    }
  });
});

// 2. Read Footer: Attached to footer button
const footerButton = document.querySelector('#btnReadFooter');
if (footerButton) {
  footerButton.addEventListener('click', event => {
    // Pipeline: button -> closest 'tfoot' -> queryAll 'td[data-field]' -> toObject
    const footerData = runPipeline(event.currentTarget, tableConfig.footerRecipe);

    console.log('Extracted Footer Object:', footerData);

    if (footerOutput) {
      footerOutput.textContent = JSON.stringify(footerData, null, 2);
    }
  });
}
