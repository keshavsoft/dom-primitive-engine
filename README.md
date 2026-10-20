# DOM Primitive Engine

A small browser-native, instruction-driven DOM extraction prototype. No dependencies required.

## Structure
- `src/primitives/find.js`: closest, querySelector, querySelectorAll, ID/class/tag lookup, matches.
- `src/primitives/read.js`: values, checked state, text, attributes, properties, control collections to objects.
- `src/primitives/navigate.js`: parent/children/sibling helpers.
- `src/runInstructions.js`: executes ordered instructions; each step can save its result for the next step.
- `examples/form/`: form extraction instructions and browser example.
- `examples/table/`: row/cell extraction instructions and browser example.

The caller supplies `start` (typically `event.currentTarget`). Primitive functions do not access `document` or `globalThis`. `getElementById` is only for roots that support it, such as Document or DocumentFragment; it is not an Element method. Open either example HTML file directly in a modern browser.

Run pure helper tests with `npm test`.
