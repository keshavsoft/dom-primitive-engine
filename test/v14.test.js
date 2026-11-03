import test from "node:test";
import assert from "node:assert/strict";
import { runInstructions, readRow, bindEvents } from "../src/index.js";
import querySelector from "../src/v14/find/querySelector.js";
import isKey from "../src/v14/events/isKey.js";

test("v14: querySelector finds a single matching element", () => {
  const mockContainer = {
    querySelector: (selector) => {
      assert.equal(selector, "input[type='search']");
      return { tagName: "input", value: "search-term" };
    }
  };

  const result = querySelector(mockContainer, { selector: "input[type='search']" });
  assert.equal(result.value, "search-term");
});

test("v14: isKey matches target key and returns element", () => {
  const enterEvent = {
    key: "Enter",
    target: { tagName: "input", value: "High Tensile Bolt" }
  };
  const escapeEvent = {
    key: "Escape",
    target: { tagName: "input", value: "High Tensile Bolt" }
  };

  const matched = isKey(enterEvent, { key: "Enter" });
  assert.equal(matched.value, "High Tensile Bolt");

  const nonMatched = isKey(escapeEvent, { key: "Enter" });
  assert.equal(nonMatched, null);
});

test("v14: runInstructions executes keydown pipeline and invokes outside function on Enter", () => {
  const enterEvent = {
    key: "Enter",
    target: {
      tagName: "input",
      value: "Fasteners"
    }
  };

  const instructions = [
    {
      narration: "Guard: only proceed if Enter key was pressed",
      sourcePath: { fileName: "root" },
      func: "isKey",
      arguments: { key: "Enter" }
    },
    {
      narration: "Read input value",
      sourcePath: { fileName: "previous" },
      func: "readValue"
    },
    {
      narration: "Execute outside custom function to build search payload",
      sourcePath: { fileName: "previous" },
      func: "onSearchSubmit"
    }
  ];

  // Outside function supplied in clientData
  const clientData = {
    onSearchSubmit: (value) => ({
      query: value,
      submitted: true,
      timestamp: 12345
    })
  };

  const resultOnEnter = runInstructions(enterEvent, instructions, clientData);
  assert.deepEqual(resultOnEnter, {
    query: "Fasteners",
    submitted: true,
    timestamp: 12345
  });

  // Test with another key (e.g. typing "a")
  const keyAEvent = {
    key: "a",
    target: {
      tagName: "input",
      value: "Fasteners"
    }
  };

  const resultOnKeyA = runInstructions(keyAEvent, instructions, clientData);
  assert.equal(resultOnKeyA, null); // Pipeline safely halted early!
});

test("v14: table row extraction remains backwards compatible", () => {
  const mockButton = {
    closest: (selector) => ({
      querySelectorAll: () => [
        { textContent: "Bolt" },
        { textContent: "Fasteners" }
      ]
    })
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

  const clientData = { columns: ["item", "cat"] };
  const res = runInstructions(mockButton, instructions, clientData);
  assert.deepEqual(res, { item: "Bolt", cat: "Fasteners" });
});

test("v14: bindEvents attaches delegated listeners and triggers onExtract", () => {
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
            { textContent: "101" },
            { textContent: "Steel Bolt" }
          ]
        };
      }
      return null;
    }
  };

  let extractedData = null;

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
        columns: ["id", "itemName"]
      },
      onExtract: (data) => {
        extractedData = data;
      }
    }
  ]);

  // Simulate click event
  listeners["click"]({
    target: mockButton
  });

  assert.deepEqual(extractedData, {
    id: "101",
    itemName: "Steel Bolt"
  });
});
