# DOM Primitive Engine — Instruction Specification (v13)

This document is the normative specification for writing instruction pipelines with `dom-primitive-engine` (v13).

---

## 1. Instruction Schema

An instruction pipeline is an array of plain JavaScript objects (or a `.json` file):

```typescript
interface Instruction {
  /** Optional human-readable description of the step */
  narration?: string;

  /** Specifies where the input element or data originates */
  sourcePath: {
    fileName: "root" | "previous" | "clientData";
  };

  /** The identifier of the primitive operation to execute */
  func: "closest" | "querySelectorAll" | "mapValues" | "mapNamedValues" | "readText" | "readValue";

  /** Operation-specific arguments */
  arguments?: Record<string, any>;
}
```

---

## 2. Input Resolution (`sourcePath.fileName`)

| Value | Behavior |
| :--- | :--- |
| `"root"` | Resolves to the initial element passed to `runInstructions` (usually `event.currentTarget`). |
| `"previous"` | Resolves to the output of the immediately preceding instruction. |
| `"clientData"` | Resolves to the entire `clientData` dictionary passed to `runInstructions`. |

---

## 3. Primitives Reference

All primitive functions adhere to the signature:
```javascript
(input, args, clientData) => Result
```

### `closest`
Finds the nearest ancestor (or self) of `input` matching a CSS selector.
* **Input**: DOM Element.
* **Arguments**:
  * `selector` (string, required): Standard CSS selector string (e.g. `"tr"`, `"form"`, `".card"`).
* **Returns**: Matching DOM Element or `null`.

---

### `querySelectorAll`
Finds all descendant elements matching a CSS selector.
* **Input**: DOM Element (or Document/DocumentFragment).
* **Arguments**:
  * `selector` (string, required): Standard CSS selector (e.g. `"td:not(:last-child)"`, `"input, select"`).
* **Returns**: Standard JavaScript `Array<Element>` (converted via `Array.from`).

---

### `readText`
Extracts text content from a DOM node.
* **Input**: DOM Element.
* **Arguments**:
  * `trim` (boolean, optional, default: `true`): Whether to trim leading and trailing whitespace.
* **Returns**: string.

---

### `readValue`
Reads the functional value of an element or form control:
* **Input**: DOM Element.
* **Rules**:
  * `<input type="checkbox">` $\to$ Returns `element.value || true` if checked; otherwise `false`.
  * `<input type="radio">` $\to$ Returns `element.value` if checked; otherwise `undefined`.
  * `<select multiple>` $\to$ Returns an `Array<string>` of selected option values.
  * Inputs, textareas, standard selects $\to$ Returns `element.value`.
  * Other elements $\to$ Falls back to `element.textContent.trim()`.
* **Returns**: string, boolean, array, or `undefined`.

---

### `mapValues`
Maps an array of elements into a structured object using positional keys.
* **Input**: `Array<Element>`.
* **Arguments**:
  * `columns` (array of strings, optional): Keys corresponding to each index. If omitted, falls back to `clientData.columns`.
  * `read` (string, optional, default: `"text"`):
    * `"text"`: Reads element text via `readText`.
    * `"value"`: Reads form value via `readValue`.
* **Behavior**:
  ```javascript
  elements.forEach((element, index) => {
    const key = columns[index];
    if (!key) return; // Ignores elements that have no corresponding column key
    result[key] = read === "value" ? readValue(element) : readText(element);
  });
  ```
* **Returns**: Plain JavaScript `Object`.

---

### `mapNamedValues`
Maps form controls that have a `name` attribute into a structured key-value object.
* **Input**: `Array<Element>`.
* **Behavior**:
  * Extracts key from `element.name`.
  * Reads value using `readValue(element)`.
  * If a radio button is unchecked (`undefined`), it is skipped.
  * If multiple controls share the same `name` (e.g. checkboxes or grouped inputs), the values are automatically accumulated into an `Array`.
* **Returns**: Plain JavaScript `Object`.

---

## 4. Full Table Extraction Example

```json
[
  {
    "narration": "Find the row containing the clicked button.",
    "sourcePath": { "fileName": "root" },
    "func": "closest",
    "arguments": { "selector": "tr" }
  },
  {
    "narration": "Select all data cells except the final action column.",
    "sourcePath": { "fileName": "previous" },
    "func": "querySelectorAll",
    "arguments": { "selector": "td:not(:last-child)" }
  },
  {
    "narration": "Map cell text to configured columns.",
    "sourcePath": { "fileName": "previous" },
    "func": "mapValues",
    "arguments": { "read": "text" }
  }
]
```

### Accompanying Client Data
```javascript
const clientData = {
  columns: ["itemName", "category", "baseUnit", "openingRate"]
};
```

### Result
```javascript
{
  itemName: "0.09/30mm High Tensile Bolt",
  category: "Fasteners",
  baseUnit: "kgs",
  openingRate: "1200.00/kgs"
}
```

