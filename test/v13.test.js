import test from "node:test";
import assert from "node:assert/strict";
import { runInstructions, readRow, readFooter } from "../src/index.js";
import readText from "../src/v13/read/readText.js";
import readValue from "../src/v13/read/readValue.js";
import mapValues from "../src/v13/read/mapValues.js";
import mapNamedValues from "../src/v13/read/mapNamedValues.js";

test("v13: readText trims whitespace by default", () => {
  const element = { textContent: "  Hello World  " };
  assert.equal(readText(element, {}), "Hello World");
  assert.equal(readText(element, { trim: false }), "  Hello World  ");
});

test("v13: readValue handles input, checkbox, radio, and select", () => {
  assert.equal(readValue({ tagName: "input", type: "text", value: "Keshav" }), "Keshav");
  assert.equal(readValue({ tagName: "input", type: "checkbox", checked: true, value: "active" }), "active");
  assert.equal(readValue({ tagName: "input", type: "checkbox", checked: false }), false);
  assert.equal(readValue({ tagName: "input", type: "radio", checked: true, value: "opt1" }), "opt1");
  assert.equal(readValue({ tagName: "input", type: "radio", checked: false, value: "opt2" }), undefined);
  assert.deepEqual(
    readValue({
      tagName: "select",
      multiple: true,
      selectedOptions: [{ value: "A" }, { value: "B" }]
    }),
    ["A", "B"]
  );
});

test("v13: mapValues maps array of elements to columns", () => {
  const cells = [
    { textContent: "Bolt" },
    { textContent: "Fasteners" },
    { textContent: "100" }
  ];
  const columns = ["itemName", "category", "price"];
  const result = mapValues(cells, { columns, read: "text" });
  assert.deepEqual(result, {
    itemName: "Bolt",
    category: "Fasteners",
    price: "100"
  });
});

test("v13: mapNamedValues extracts named form controls", () => {
  const controls = [
    { name: "itemName", tagName: "input", type: "text", value: "Nut" },
    { name: "category", tagName: "select", value: "Fasteners" },
    { name: "tag", tagName: "input", type: "text", value: "steel" },
    { name: "tag", tagName: "input", type: "text", value: "zinc" }
  ];
  const result = mapNamedValues(controls);
  assert.deepEqual(result, {
    itemName: "Nut",
    category: "Fasteners",
    tag: ["steel", "zinc"]
  });
});

test("v13: runInstructions executes full extraction pipeline", () => {
  const mockButton = {
    closest: (selector) => {
      assert.equal(selector, "tr");
      return {
        querySelectorAll: (sel) => {
          assert.equal(sel, "td:not(:last-child)");
          return [
            { textContent: "101" },
            { textContent: "Widget A" },
            { textContent: "Parts" }
          ];
        }
      };
    }
  };

  const instructions = [
    {
      narration: "Find row",
      sourcePath: { fileName: "root" },
      func: "closest",
      arguments: { selector: "tr" }
    },
    {
      narration: "Collect cells",
      sourcePath: { fileName: "previous" },
      func: "querySelectorAll",
      arguments: { selector: "td:not(:last-child)" }
    },
    {
      narration: "Map values",
      sourcePath: { fileName: "previous" },
      func: "mapValues",
      arguments: { read: "text" }
    }
  ];

  const clientData = {
    columns: ["id", "name", "category"]
  };

  const result = runInstructions(mockButton, instructions, clientData);
  assert.deepEqual(result, {
    id: "101",
    name: "Widget A",
    category: "Parts"
  });
});

test("v13: readRow helper extracts row data", () => {
  const mockEvent = {
    currentTarget: {
      closest: (selector) => {
        assert.equal(selector, "tr");
        return {
          querySelectorAll: (sel) => [
            { textContent: "Bolt" },
            { textContent: "Fasteners" }
          ]
        };
      }
    }
  };

  const result = readRow(mockEvent, ["itemName", "category"]);
  assert.deepEqual(result, {
    itemName: "Bolt",
    category: "Fasteners"
  });
});

