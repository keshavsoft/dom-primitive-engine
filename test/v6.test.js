import test from 'node:test';
import assert from 'node:assert/strict';
import { runPipeline, findClosest, queryAll, collectionToObject } from '../src/v6/index.js';

test('V6: collectionToObject maps control names and values cleanly', () => {
  const mockControls = [
    { name: 'name', value: 'Keshav', tagName: 'INPUT', type: 'text' },
    { name: 'mobile', value: '9876543210', tagName: 'INPUT', type: 'tel' }
  ];
  const result = collectionToObject(mockControls);
  assert.deepEqual(result, { name: 'Keshav', mobile: '9876543210' });
});

test('V6: runPipeline executes full 3-step form recipe', () => {
  const mockInputs = [
    { name: 'name', value: 'Keshav', tagName: 'INPUT', type: 'text' },
    { name: 'mobile', value: '9876543210', tagName: 'INPUT', type: 'tel' }
  ];

  const mockForm = {
    querySelectorAll: (selector) => {
      assert.equal(selector, 'input');
      return mockInputs;
    }
  };

  const mockButton = {
    closest: (selector) => {
      assert.equal(selector, 'form');
      return mockForm;
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

test('V6: runPipeline executes partial recipe (skips closest if start is already container)', () => {
  const mockInputs = [
    { name: 'name', value: 'Keshav', tagName: 'INPUT', type: 'text' }
  ];

  const mockContainer = {
    querySelectorAll: () => mockInputs
  };

  const recipe = {
    queryAll: 'input',
    loop: 'toObject'
  };

  const result = runPipeline(mockContainer, recipe);
  assert.deepEqual(result, { name: 'Keshav' });
});
