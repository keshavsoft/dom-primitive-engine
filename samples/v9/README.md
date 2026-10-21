# DOM Primitive Engine V9

V9 adds an ordered instruction-array pipeline dispatched through an operation registry. Earlier V1–V8 source files remain unchanged.

## Table row extraction

```js
const result = runPipeline(clickedButton, [
  { op: "closest", args: { selector: "tr" } },
  { op: "queryAll", args: { selector: "td" } },
  { op: "toObject", args: {
      columns: ["itemName", "category", "price"],
      read: "text"
  } }
]);
```

The `columns` array is passed to `toObject` in memory; keys map to selected cells by index. Do not include action/options cells in the selected cell collection unless they also have a column key.

## Form extraction

```js
const result = runPipeline(submitButton, [
  { op: "closest", args: { selector: "form" } },
  { op: "queryAll", args: { selector: "input[name], select[name], textarea[name]" } },
  { op: "toObject" }
]);
```

## Operations

- `closest` — `{ selector }`
- `queryAll` — `{ selector }`
- `queryOne` — `{ selector }`
- `readText` — `{ trim }`
- `readValue`
- `toArray` — `{ read: "text" | "value" }`
- `toObject` — `{ columns, keyAttribute, read: "auto" | "text" | "value" }`

Each instruction is `{ "op": "<registered operation>", "args": { ... } }`.
