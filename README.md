# DOM Primitive Engine

> **Browser-native, declarative, instruction-driven DOM extraction engine.**  
> Zero dependencies. Built purely on standard Web APIs. Single source of truth: `v18`.

---

## 🤝 Pairing with `dom-primitive-bindings`

In **v18**, event delegation is fully decoupled into its sibling package, **`dom-primitive-bindings`**:

1. **The Wiring Layer (`dom-primitive-bindings`)**:
   Attaches a single listener to the parent container using declarative `bindings.json` and intercepts bubbling events.
2. **The Extraction Layer (`dom-primitive-engine`)**:
   Takes the matched target element and executes `instructions.json` pipelines to extract clean, typed JSON data.

```text
[ User clicks button in Table ]
               │
               ▼
┌───────────────────────────────────────────────┐
│ dom-primitive-bindings (The Trigger / Wiring) │
│  • Single container listener                  │
│  • Matches target element via closest()       │
└──────────────────────┬────────────────────────┘
                       │ delivers matchElement
                       ▼
┌───────────────────────────────────────────────┐
│ dom-primitive-engine (The Traversal / Extract)│
│  • Runs instructions.json                     │
│  • Traverses DOM: tr ➔ td:not(:last-child)    │
│  • Returns clean { itemName, category, rate } │
└───────────────────────────────────────────────┘
```

---

## The Big Picture: Why DOM Primitive Engine?

In data-driven web applications (especially tables, forms, and dynamic grids), user interactions regularly require extracting structured data out of the DOM. For example:
- A user clicks **"Show"** or **"Delete"** inside a table row.
- A user clicks **"Save"** inside a form or table footer.

Traditionally, developers write imperative, tightly-coupled DOM traversal inside event handlers:

```javascript
// Brittle imperative traversal:
const row = button.closest("tr");
const cells = row.querySelectorAll("td");
const rowData = {
  itemName: cells[1].textContent.trim(),
  category: cells[2].textContent.trim()
};
```

### The Problem With Imperative Extraction
1. **Tightly coupled to layout:** If a column is added (e.g., a serial number `#` or a checkbox), cell indexes shift and your code silently returns corrupted data.
2. **Duplicated logic:** Every table and form reinvents custom traversal and parsing code.
3. **Hard to configure remotely:** You cannot change extraction rules from configuration files or backend APIs without deploying new JavaScript code.

### The Solution: Declarative Extraction Pipelines
**DOM Primitive Engine** separates the **event trigger** (your application's responsibility) from the **extraction journey** (the engine's responsibility).

- Your UI components (like `json-renderers`) build and mount the DOM.
- Your event listeners capture the user's action (`event.currentTarget`).
- The **DOM Primitive Engine** executes a sequence of atomic, composable operations (**primitives**) defined in a clean JSON instruction pipeline to produce a plain JavaScript object.

---

## How It Works: The Execution Pipeline

Each instruction in the pipeline receives an input, executes one single primitive function, and passes its output forward to the next instruction:

```
[ Clicked Button ] (event.currentTarget)
       │
       ▼  Step 1: "sourcePath": "root", "func": "closest", "selector": "tr"
   [ <tr> Element ]
       │
       ▼  Step 2: "sourcePath": "previous", "func": "querySelectorAll", "selector": "td:not(:last-child)"
   [ Array of <td> Cells ]
       │
       ▼  Step 3: "sourcePath": "previous", "func": "mapValues", "columns": [...]
   { itemName: "0.09/30mm Bolt", category: "Fasteners", ... }
```

### The Instruction Contract

Each step in `instructions.json` is a declarative JSON object:

```json
[
  {
    "narration": "Find the table row containing the clicked button.",
    "sourcePath": { "fileName": "root" },
    "func": "closest",
    "arguments": { "selector": "tr" }
  },
  {
    "narration": "Collect all data cells from that row (excluding action buttons).",
    "sourcePath": { "fileName": "previous" },
    "func": "querySelectorAll",
    "arguments": { "selector": "td:not(:last-child)" }
  },
  {
    "narration": "Map cell values into an object using client columns.",
    "sourcePath": { "fileName": "previous" },
    "func": "mapValues",
    "arguments": { "read": "text" }
  }
]
```

### Fields Explained

| Property | Purpose | Values |
| :--- | :--- | :--- |
| `narration` | Human-readable explanation of what this step does | Any descriptive string |
| `sourcePath.fileName` | Identifies where the input to this step comes from | `"root"` (original target), `"previous"` (result of prior step), or `"clientData"` |
| `func` | The atomic DOM primitive operation to execute | `"closest"`, `"querySelectorAll"`, `"mapValues"`, `"mapNamedValues"`, `"readText"`, `"readValue"` |
| `arguments` | Parameters required by the primitive operation | E.g. `{ "selector": "tr" }`, `{ "read": "text" }`, `{ "trim": true }` |

---

## Available Primitives (`src/v13`)

All operations follow a unified signature: `(input, args, clientData)`.

### 1. Element Navigation (`find/`)
* **`closest(input, { selector })`**: Finds the nearest ancestor matching the CSS selector (starts from `input`).
* **`querySelectorAll(input, { selector })`**: Queries all matching child elements and returns them as a standard JavaScript `Array`.

### 2. Reading & Mapping (`read/`)
* **`readText(input, { trim = true })`**: Extracts `.textContent` from an element, with optional whitespace trimming.
* **`readValue(input)`**: Intelligently extracts values from form controls:
  * Checkboxes $\to$ boolean or checkbox value
  * Radios $\to$ checked radio value
  * Multi-selects $\to$ array of selected values
  * Inputs / Textareas / Selects $\to$ `.value`
  * Standard elements $\to$ trimmed `.textContent`
* **`mapValues(elements, { columns, read = "text" }, clientData)`**: Iterates over an array of elements and maps each by index to `columns[index]`. Reads text or form value based on `read`.
* **`mapNamedValues(controls)`**: Inspects form controls with `name` attributes (like inside a `<form>` or `<tfoot>`) and maps them directly to `{ [name]: value }`, grouping matching names into arrays automatically.

### 3. Built-in High-Level Helpers (`tableReaders.js`)
For common table use cases, pre-composed helper functions are included:
* **`readRow(source, columns)`**: Starting from a button or event inside a row, automatically locates the row, queries its cells, and returns an object keyed by `columns`.
* **`readFooter(source, columns)`**: Reads inputs/selects inside the nearest `<tfoot>`, using control `name` attributes or falling back to positional `columns`.

---

## Minimum Working Example (Step-by-Step)

Here are the minimum steps to extract data from a table row when a button is clicked:

### 1. Include the Library
In your HTML, load the engine:

```html
<!-- Global CDN or local bundle -->
<script type="module" src="https://keshavsoft.github.io/dom-primitive-engine/dist/v13/min.js"></script>
<script type="module" src="./index.js"></script>
```

*(Or via NPM: `npm install dom-primitive-engine`)*

### 2. Define the Pipeline (`instructions.json`)
```json
[
  {
    "narration": "Locate row from clicked element",
    "sourcePath": { "fileName": "root" },
    "func": "closest",
    "arguments": { "selector": "tr" }
  },
  {
    "narration": "Collect row cells",
    "sourcePath": { "fileName": "previous" },
    "func": "querySelectorAll",
    "arguments": { "selector": "td:not(:last-child)" }
  },
  {
    "narration": "Map cell text to keys",
    "sourcePath": { "fileName": "previous" },
    "func": "mapValues",
    "arguments": { "read": "text" }
  }
]
```

### 3. Configure Columns & Extraction Function (`extractRow.js`)
```javascript
import instructions from "./instructions.json" with { type: "json" };

const clientData = {
  columns: ["itemName", "category", "baseUnit", "openingRate"]
};

export const extractRow = (clickedElement) =>
  window.ks.domPrimitiveEngine.runInstructions(clickedElement, instructions, clientData);
```

### 4. Trigger on Click (`index.js`)
```javascript
import { extractRow } from "./extractRow.js";

document.querySelectorAll(".ks-btn-show").forEach((button) => {
  button.addEventListener("click", (event) => {
    const data = extractRow(event.currentTarget);
    console.log("Extracted Row Data:", data);
  });
});
```

---

## Package Consumption

### Modern ES Module (Bundler / Node)
```javascript
import { runInstructions, readRow, readFooter } from "dom-primitive-engine";

// Using raw instructions:
const result = runInstructions(startElement, instructions, clientData);

// Or using built-in helpers:
const rowData = readRow(event.currentTarget, ["itemName", "category", "price"]);
```

### Browser Global
When loaded directly in a browser without a bundler, the engine registers under the `window.ks` namespace:
```javascript
window.ks.domPrimitiveEngine = {
  meta: { name: "dom-primitive-engine", version: "1.13.0" },
  runInstructions: (element, instructions, clientData) => { ... }
};
```

---

## Directory Structure (`Single Source of Truth: v13`)

```
dom-primitive-engine/
├── src/
│   ├── index.js                  # Entry point (exports current v13 implementation)
│   └── v13/
│       ├── index.js              # Registers window.ks and exports API
│       ├── runInstructions.js    # Pipeline runner
│       ├── tableReaders.js       # High-level readRow & readFooter helpers
│       ├── find/                 # DOM query primitives (closest, querySelectorAll)
│       ├── read/                 # Extraction primitives (readText, readValue, mapValues, mapNamedValues)
│       ├── register/             # Global window.ks namespace registration
│       └── runInstruction/       # Step input resolver and arguments combiner
├── docs/                         # In-depth architectural guides and interactive stories
├── samples/v13/                  # Working reference implementations
└── package.json
```

---

## Documentation & Deep-Dive Guides

For comprehensive explanations, architecture diagrams, and design trade-offs, explore the `docs/` folder:
- [Architecture & Design Story](docs/architecture.md): The philosophy of instruction-driven DOM parsing.
- [Instruction Specification](docs/instruction-spec.md): Complete schema, arguments, and edge cases.
- [Interactive Visual Walkthrough](docs/index.html): Open in browser to see interactive visual flowcharts of data extraction.

---

## License

MIT © KeshavSoft
