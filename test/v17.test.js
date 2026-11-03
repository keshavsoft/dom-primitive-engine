import test from "node:test";
import assert from "node:assert/strict";
import getContainer from "../src/v17/bindEvents/getContainer.js";
import groupBindings from "../src/v17/bindEvents/groupBindings.js";
import getStartInput from "../src/v17/bindEvents/getStartInput.js";
import getClientData from "../src/v17/bindEvents/getClientData.js";
import executeBinding from "../src/v17/bindEvents/executeBinding.js";
import { bindEvents } from "../src/v17/index.js";

test("v17: getContainer resolves element or returns null", () => {
  const mockEl = { id: "test" };
  assert.equal(getContainer(mockEl), mockEl);
  assert.equal(getContainer(null), null);
});

test("v17: groupBindings groups bindings by event type", () => {
  const bindings = [
    { event: "click", selector: ".btn-1" },
    { event: "click", selector: ".btn-2" },
    { event: "keydown", selector: "input" }
  ];

  const groups = groupBindings(bindings);
  assert.equal(groups.get("click").length, 2);
  assert.equal(groups.get("keydown").length, 1);
});

test("v17: getStartInput returns event for keyboard events, matchElement otherwise", () => {
  const el = { tagName: "button" };
  const clickEvent = { type: "click" };
  const keyEvent = { type: "keydown", key: "Enter" };

  assert.equal(getStartInput({}, clickEvent, el), el);
  assert.equal(getStartInput({}, keyEvent, el), keyEvent);
  assert.equal(getStartInput({ root: "event" }, clickEvent, el), clickEvent);
});

test("v17: getClientData packages clientData with event and targetElement", () => {
  const binding = { clientData: { columns: ["a", "b"] } };
  const event = { type: "click" };
  const matchElement = { tagName: "button" };

  const cd = getClientData(binding, event, matchElement);
  assert.deepEqual(cd.columns, ["a", "b"]);
  assert.equal(cd.event, event);
  assert.equal(cd.targetElement, matchElement);
});

test("v17: executeBinding runs runner and triggers onExtract", () => {
  let extracted = null;
  const binding = {
    runner: (input) => ({ out: input.val }),
    onExtract: (res) => { extracted = res; }
  };

  const res = executeBinding({
    binding,
    event: { type: "click" },
    matchElement: { val: 42 }
  });

  assert.deepEqual(res, { out: 42 });
  assert.deepEqual(extracted, { out: 42 });
});

test("v17: bindEvents end-to-end delegation on container", () => {
  const listeners = {};
  const mockContainer = {
    addEventListener: (type, handler) => {
      listeners[type] = handler;
    },
    contains: () => true
  };

  const mockBtn = {
    className: "ks-btn-show",
    closest: (sel) => (sel === ".ks-btn-show" ? mockBtn : null)
  };

  let result = null;

  bindEvents(mockContainer, [
    {
      event: "click",
      selector: ".ks-btn-show",
      runner: () => ({ success: true }),
      onExtract: (data) => { result = data; }
    }
  ]);

  listeners["click"]({
    type: "click",
    target: mockBtn
  });

  assert.deepEqual(result, { success: true });
});

