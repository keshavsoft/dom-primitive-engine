import test from "node:test";
import assert from "node:assert/strict";
import { runInstructions, readRow, bindEvents } from "../src/v15/index.js";

test("v15: bindEvents wires delegated click and keydown directly to container", () => {
  const listeners = {};
  const mockContainer = {
    addEventListener: (type, handler) => {
      listeners[type] = handler;
    },
    contains: () => true
  };

  const mockButton = {
    tagName: "button",
    className: "ks-btn-show",
    closest: (sel) => {
      if (sel === ".ks-btn-show") return mockButton;
      if (sel === "tr") {
        return {
          querySelectorAll: () => [
            { textContent: "1" },
            { textContent: "High Tensile Bolt" }
          ]
        };
      }
      return null;
    }
  };

  let rowResult = null;
  let searchResult = null;

  bindEvents(mockContainer, [
    {
      event: "click",
      selector: ".ks-btn-show",
      instructions: [
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
      ],
      clientData: {
        columns: ["serial", "itemName"]
      },
      onExtract: (data) => {
        rowResult = data;
      }
    },
    {
      event: "keydown",
      selector: "input[type='search']",
      instructions: [
        {
          sourcePath: { fileName: "root" },
          func: "isKey",
          arguments: { key: "Enter" }
        },
        {
          sourcePath: { fileName: "previous" },
          func: "readValue"
        },
        {
          sourcePath: { fileName: "previous" },
          func: "onSearch"
        }
      ],
      clientData: {
        onSearch: (query) => ({ search: query })
      },
      onExtract: (data) => {
        searchResult = data;
      }
    }
  ]);

  // 1. Simulate button click
  listeners["click"]({
    type: "click",
    target: mockButton
  });

  assert.deepEqual(rowResult, {
    serial: "1",
    itemName: "High Tensile Bolt"
  });

  // 2. Simulate typing search and pressing Enter
  const mockInput = {
    tagName: "input",
    value: "Fasteners",
    closest: (sel) => (sel === "input[type='search']" ? mockInput : null)
  };

  listeners["keydown"]({
    type: "keydown",
    key: "Enter",
    target: mockInput
  });

  assert.deepEqual(searchResult, {
    search: "Fasteners"
  });
});

