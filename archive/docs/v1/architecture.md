# Architecture & Design Story — DOM Primitive Engine

This document details the architectural philosophy, data flow, and design trade-offs behind **DOM Primitive Engine**.

---

## 1. The Core Architectural Philosophy

### Separation of Concerns: Rendering vs. Extraction

Modern component libraries often blur the boundary between **how the UI is rendered** and **how data is extracted from it**. In enterprise web applications using micro-frontends or declarative JSON renderers (like `json-renderers`), components are dynamically assembled:

```
┌─────────────────────────────────┐
│     JSON Component Renderer     │  <-- Responsibility: Build & Mount DOM
│        (e.g., json-renderers)   │
└────────────────┬────────────────┘
                 │ mounts HTML
                 ▼
┌─────────────────────────────────┐
│           Browser DOM           │  <-- Stateful View (Table, Form, Cards)
└────────────────┬────────────────┘
                 │ user interaction (click, change)
                 ▼
┌─────────────────────────────────┐
│      Application Handler        │  <-- Responsibility: Receives Event
└────────────────┬────────────────┘
                 │ passes event.currentTarget
                 ▼
┌─────────────────────────────────┐
│      DOM Primitive Engine       │  <-- Responsibility: Traverses & Extracts Data
└────────────────┬────────────────┘
                 │ outputs clean JS Object
                 ▼
┌─────────────────────────────────┐
│    Business Logic / API Call    │  <-- Consumes Plain Data
└─────────────────────────────────┘
```

By decoupling DOM extraction into an independent, instruction-driven engine:
1. The **rendering system** only cares about translating data $\to$ DOM.
2. The **event handler** only cares about user interaction.
3. The **extraction engine** provides a deterministic bridge from DOM $\to$ data without hardcoded scripts.

---

## 2. Why Not Simple DOM Queries?

A common question is: *Why not just write a 3-line query selector in the event handler?*

```javascript
// Quick and dirty:
const data = {
  name: e.target.closest("tr").children[1].innerText,
  category: e.target.closest("tr").children[2].innerText
};
```

### The Pitfalls of Ad-Hoc Extraction
1. **Positional Fragility**: If the table adds a column (such as a serial number column `#`, a checkbox selection column, or status badges), every hardcoded child index (`children[1]`) breaks.
2. **Hidden Control Differences**: An input control inside a cell needs `.value` or `.checked`, whereas a static text cell needs `.textContent.trim()`. Ad-hoc code mixes these concerns inconsistently.
3. **Loss of Composability**: When identical table schemas appear across multiple views, ad-hoc query logic is copy-pasted and diverges over time.
4. **Impossible to Configure Remotely**: In schema-driven applications, UI layouts change per tenant or user role. Ad-hoc JS requires code redeployments, while instruction JSON can be served directly from backend configurations.

---

## 3. The 3-Stage Pipeline Model

The engine operates on a functional pipeline principle. An instruction list is executed sequentially:

$$\text{Initial Element} \xrightarrow{\text{Step 1}} \text{Result}_1 \xrightarrow{\text{Step 2}} \text{Result}_2 \dots \xrightarrow{\text{Step } n} \text{Final Data Object}$$

### Step Lifecycle

For every instruction object in `instructions.json`:
1. **Input Resolution (`getInput`)**:
   - `sourcePath: { "fileName": "root" }` $\to$ Uses the starting DOM element (e.g. `event.currentTarget`).
   - `sourcePath: { "fileName": "previous" }` $\to$ Uses the returned value of the prior instruction.
   - `sourcePath: { "fileName": "clientData" }` $\to$ Uses the shared `clientData` dictionary passed to the engine.
2. **Arguments Combination (`getArguments`)**:
   - Merges inline instruction arguments with defaults supplied by `clientData` (such as `columns`, `options`, `data`).
3. **Execution**:
   - Resolves the function name from the primitives registry (`operations[instruction.func]`).
   - Executes `func(input, arguments, clientData)` in an isolated, pure-function manner.
4. **Carry-Forward**:
   - The result is stored as `previousResult` for the next instruction.

---

## 4. Responsibility Boundaries

| Actor | What It Does | What It NEVER Decides |
| :--- | :--- | :--- |
| **User Interaction** | User clicks a button or edits a form | Doesn't know anything about data schemas |
| **Event Listener** | Calls `event.currentTarget` and triggers extraction | Doesn't know column indexes or selector chains |
| **Instruction JSON** | Declares the query path and column mapping | Doesn't execute code directly |
| **DOM Primitive Engine** | Executes instructions sequentially, manages context | Doesn't make assumptions about application business logic |
| **DOM Primitives** | Pure functions (`closest`, `readText`, `mapValues`) | Don't access global variables or mutate DOM |

---

## 5. Handling Edge Cases & Structural Shifts

### Case 1: Tables With Dynamic Serial (`#`) or Options Columns
When a table contains a serial number column (`# 1, 2, ...`) or action buttons:
- **Solution A**: Use precise CSS negation in the query step:
  ```json
  {
    "func": "querySelectorAll",
    "arguments": { "selector": "td:not(:first-child):not(:last-child)" }
  }
  ```
- **Solution B**: Include the structural columns in `clientData.columns`:
  ```javascript
  const clientData = {
    columns: ["serial", "itemName", "category", "baseUnit", "openingRate"]
  };
  ```

### Case 2: Mixing Read-Only Cells and Input Controls
When a row contains both plain text and editable form fields (like inline editing):
- `read: "text"` reads `.textContent.trim()`
- `read: "value"` intelligently checks for `.value`, `.checked`, or multi-select options using `readValue`.

---

## 6. Version Evolution (`v13` as Single Source of Truth)

Earlier iterations (v1 - v12) experimented with varied instruction schemas (`op` vs `func`, `args` vs `arguments`) and varying degrees of coupling.

In **v13**, the architecture reached full maturity:
* **Strict naming**: `func`, `arguments`, `sourcePath`.
* **Standardized 3-argument signature**: Every primitive implements `(input, args, clientData)`.
* **Clean Global Registry**: Namespace under `window.ks.domPrimitiveEngine`.
* **Pre-composed helpers**: `tableReaders.js` (`readRow`, `readFooter`) provides zero-boilerplate wrappers for the most common 90% of use cases.

