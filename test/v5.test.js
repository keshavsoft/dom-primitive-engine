import test from "node:test";
import assert from "node:assert/strict";
import { runInstructions, instructionOperations } from "../src/v5/index.js";
import { readControlValue, controlsToObject } from "../src/v5/primitives/read.js";

test("V5 instruction operations match expected primitives", () => {
  for (const op of ["closest", "queryOne", "queryAll", "controlsToObject"]) {
    assert.ok(instructionOperations.includes(op));
  }
});

test("V5 extracts name and mobile correctly from mock controls", () => {
  const mockControls = [
    { name: "name", value: "Keshav", tagName: "INPUT", type: "text" },
    { name: "mobile", value: "9876543210", tagName: "INPUT", type: "tel" }
  ];
  const result = controlsToObject(mockControls);
  assert.deepEqual(result, { name: "Keshav", mobile: "9876543210" });
});
