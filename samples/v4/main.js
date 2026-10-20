import { runInstructions, meta } from '../../src/index.js';
import formConfig from './form-instructions.json';
import tableConfig from './table-instructions.json';

const api = Object.freeze({
  meta,
  collectFormData: event => runInstructions({ start: event.currentTarget, instructions: formConfig.collectFormInstructions }).data,
  collectRow: row => runInstructions({ start: row, instructions: tableConfig.collectRowInstructions }).data,
  readRowCells: row => Array.from(runInstructions({ start: row, instructions: tableConfig.rowCellsInstructions }).cells, cell => cell.textContent.trim()),
  readClickedCell: button => runInstructions({ start: button, instructions: tableConfig.clickedCellInstructions }).text
});
if (typeof window !== 'undefined') window.DOMPrimitiveEngineV3 = api;

for (const form of document.querySelectorAll('[data-demo-form]')) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = api.collectFormData({ currentTarget: form });
    const output = form.querySelector('[data-output]');
    if (output) output.textContent = JSON.stringify(data, null, 2);
  });
}
for (const button of document.querySelectorAll('[data-read-row]')) {
  button.addEventListener('click', event => {
    const row = event.currentTarget.closest('tr');
    const data = api.collectRow(row);
    const output = document.querySelector('[data-table-output]');
    if (output) output.textContent = JSON.stringify(data, null, 2);
  });
}
