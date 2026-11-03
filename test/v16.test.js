import test from "node:test";
import assert from "node:assert/strict";
import { runInstructions as runExtraction } from "../src/v17/extraction/index.js";
import { bindEvents } from "../src/v17/bindEvents/index.js";
import { runInstructions, bindEvents as topBindEvents } from "../src/index.js";

test("v16: extraction/ is 100% self-contained and operates without bindEvents", () => {
  const mockButton = {
    closest: (selector) => {
      assert.equal(selector, "tr");
      return {
        querySelectorAll: (sel) => [
          { textContent: "101" },
          { textContent: "Widget V16" }
        ]
      };
    }
  };

  const instructions = [
    {
      sourcePath: { fileName: "root" },
      func: "closest",
      arguments: { selector: "tr" }
    },
    {
      sourcePath: { fileName: "previous" },
      func: "querySelectorAll",
      arguments: { selector: "td" }
    },
    {
      sourcePath: { fileName: "previous" },
      func: "mapValues",
      arguments: { read: "text" }
    }
  ];

  const result = runExtraction(mockButton, instructions, { columns: ["id", "name"] });
  assert.deepEqual(result, { id: "101", name: "Widget V16" });
});

test("v16: bindEvents/ is 100% self-contained and accepts custom runner or default", () => {
  const listeners = {};
  const mockContainer = {
    addEventListener: (type, handler) => {
      listeners[type] = handler;
    },
    contains: () => true
  };

  const mockInput = {
    tagName: "input",
    value: "Search Term",
    closest: (sel) => (sel === "input" ? mockInput : null)
  };

  let captured = null;

  // Uses custom runner independently of extraction!
  bindEvents(mockContainer, [
    {
      event: "keydown",
      selector: "input",
      runner: (input) => ({ query: input.target?.value ?? input.value }),
      onExtract: (data) => {
        captured = data;
      }
    }
  ]);

  listeners["keydown"]({
    type: "keydown",
    target: mockInput
  });

  assert.deepEqual(captured, { query: "Search Term" });
});

test("v16: top-level package exposes both extraction and bindEvents seamlessly", () => {
  assert.equal(typeof runInstructions, "function");
  assert.equal(typeof topBindEvents, "function");
});
