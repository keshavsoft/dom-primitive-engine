import test from 'node:test';
import assert from 'node:assert/strict';
import { runPipeline, findClosest, queryAll, collectionToObject, collectionToArray } from '../src/v8/index.js';

test('V8: extracts form fields (name, mobile, city)', () => {
  const mockButton = {
    closest: (selector) => {
      assert.equal(selector, 'form');
      return {
        querySelectorAll: (sel) => [
          { name: 'name', value: 'Keshav', tagName: 'INPUT', type: 'text' },
          { name: 'mobile', value: '9876543210', tagName: 'INPUT', type: 'tel' },
          { name: 'city', value: 'Hyderabad', tagName: 'SELECT' }
        ]
      };
    }
  };

  const recipe = {
    closest: 'form',
    queryAll: 'input, select, textarea',
    loop: 'toObject'
  };

  const result = runPipeline(mockButton, recipe);
  assert.deepEqual(result, { name: 'Keshav', mobile: '9876543210', city: 'Hyderabad' });
});

test('V8: extracts table row cells via data-field', () => {
  const mockRowButton = {
    closest: (selector) => {
      assert.equal(selector, 'tr');
      return {
        querySelectorAll: (sel) => [
          { getAttribute: (attr) => attr === 'data-field' ? 'id' : null, textContent: '101' },
          { getAttribute: (attr) => attr === 'data-field' ? 'name' : null, textContent: 'Alpha Enterprise' },
          { getAttribute: (attr) => attr === 'data-field' ? 'role' : null, textContent: 'Supplier' },
          { getAttribute: (attr) => attr === 'data-field' ? 'city' : null, textContent: 'Hyderabad' },
          { getAttribute: (attr) => attr === 'data-field' ? 'salary' : null, textContent: '₹1,50,000' }
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
    id: '101',
    name: 'Alpha Enterprise',
    role: 'Supplier',
    city: 'Hyderabad',
    salary: '₹1,50,000'
  });
});

test('V8: extracts table footer summary totals', () => {
  const mockFooterButton = {
    closest: (selector) => {
      assert.equal(selector, 'tfoot');
      return {
        querySelectorAll: (sel) => [
          { getAttribute: (attr) => attr === 'data-field' ? 'summaryLabel' : null, textContent: 'Totals:' },
          { getAttribute: (attr) => attr === 'data-field' ? 'totalRecords' : null, textContent: '3 Enterprises' },
          { getAttribute: (attr) => attr === 'data-field' ? 'totalPayroll' : null, textContent: '₹3,50,000' }
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
    summaryLabel: 'Totals:',
    totalRecords: '3 Enterprises',
    totalPayroll: '₹3,50,000'
  });
});
