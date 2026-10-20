import { runInstructions } from '../../archive/v2/runInstructions.js';
import formConfig from './form-instructions.json';
import tableConfig from './table-instructions.json';

export const meta = Object.freeze({ name: 'DOM Primitive Engine', version: 'V2', instructionFormat: 'JSON' });
export const collectFormData = event => runInstructions({ start: event.currentTarget, instructions: formConfig.collectFormInstructions }).data;
export const readEmail = event => runInstructions({ start: event.currentTarget, instructions: formConfig.emailInstructions }).value;
export const collectRow = event => runInstructions({ start: event.currentTarget, instructions: tableConfig.collectRowInstructions }).data;
export const readRowCells = event => Array.from(runInstructions({ start: event.currentTarget, instructions: tableConfig.rowCellsInstructions }).cells, cell => cell.textContent.trim());
export const readClickedCell = event => runInstructions({ start: event.currentTarget, instructions: tableConfig.clickedCellInstructions }).text;

// Explicit global assignment for simple browser usage / integration.
window.DOMPrimitiveEngineV2 = { meta, collectFormData, readEmail, collectRow, readRowCells, readClickedCell };

for (const form of document.querySelectorAll('[data-demo-form]')) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = collectFormData({ currentTarget: event.submitter || form.querySelector('button[type="submit"]') || form });
    const target = form.querySelector('[data-output]');
    if (target) target.textContent = JSON.stringify(data, null, 2);
  });
}
for (const button of document.querySelectorAll('[data-read-row]')) {
  button.addEventListener('click', event => {
    const row = event.currentTarget.closest('tr');
    const data = runInstructions({ start: row, instructions: tableConfig.collectRowInstructions }).data;
    const output = document.querySelector('[data-table-output]');
    if (output) output.textContent = JSON.stringify(data, null, 2);
  });
}
