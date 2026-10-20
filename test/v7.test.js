import test from 'node:test';
import assert from 'node:assert/strict';
import { runPipeline, findClosest, queryAll, collectionToObject, collectionToArray } from '../src/v7/index.js';

test('V7: extracts form fields (name and mobile)', () => {
  const mockButton = {
    closest: (selector) => {
      assert.equal(selector, 'form');
      return {
        querySelectorAll: (sel) => [
          { name: 'name', value: 'Keshav', tagName: 'INPUT', type: 'text' },
          { name: 'mobile', value: '9876543210', tagName: 'INPUT', type: 'tel' }
        ]
      };
    }
  };

  const recipe = {
    closest: 'form',
    queryAll: 'input',
    loop: 'toObject'
  };

  const result = runPipeline(mockButton, recipe);
  assert.deepEqual(result, { name: 'Keshav', mobile: '9876543210' });
});

test('V7: extracts table row cells via data-field', () => {
  const mockRowButton = {
    closest: (selector) => {
      assert.equal(selector, 'tr');
      return {
        querySelectorAll: (sel) => [
          { getAttribute: (attr) => attr === 'data-field' ? 'id' : null, textContent: 'EMP-01' },
          { getAttribute: (attr) => attr === 'data-field' ? 'name' : null, textContent: 'Keshav' },
          { getAttribute: (attr) => attr === 'data-field' ? 'role' : null, textContent: 'Architect' },
          { getAttribute: (attr) => attr === 'data-field' ? 'salary' : null, textContent: '₹1,20,000' }
        ]
      };
    }
  };

  const recipe = {
    closest: 'tr',
    queryAll: 'td[data-field]',
    loop: 'toObject'
  };

  const result = runPipeline(mockRowButton, recipe);
  assert.deepEqual(result, {
    id: 'EMP-01',
    name: 'Keshav',
    role: 'Architect',
    salary: '₹1,20,000'
  });
});

test('V7: extracts table footer summary via data-field', () => {
  const mockFooterButton = {
    closest: (selector) => {
      assert.equal(selector, 'tfoot');
      return {
        querySelectorAll: (sel) => [
          { getAttribute: (attr) => attr === 'data-field' ? 'totalCount' : null, textContent: '3 Employees' },
          { getAttribute: (attr) => attr === 'data-field' ? 'totalPayroll' : null, textContent: '₹3,00,000' }
        ]
      };
    }
  };

  const recipe = {
    closest: 'tfoot',
    queryAll: 'td[data-field]',
    loop: 'toObject'
  };

  const result = runPipeline(mockFooterButton, recipe);
  assert.deepEqual(result, {
    totalCount: '3 Employees',
    totalPayroll: '₹3,00,000'
  });
});

test('V7: collectionToArray maps cell values to an array', () => {
  const mockCells = [
    { textContent: 'Cell 1' },
    { textContent: 'Cell 2' }
  ];
  const result = collectionToArray(mockCells);
  assert.deepEqual(result, ['Cell 1', 'Cell 2']);
});
