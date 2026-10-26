# Table events with DOM Primitive Engine

This isolated example connects the two responsibilities without changing existing renderer versions:

- `json-renderers` creates and mounts a table with row Options and footer Save buttons.
- `dom-primitive-engine` runs declarative instructions to locate the row, query its cells or controls, and convert the results into an object.
- The event delegation stays in the example; the DOM extraction logic stays in `methods/tableEvents.js`.

## Try it

From the `json-renderers` repository root:

```sh
npm install
npm install dom-primitive-engine
npm run dev
```

Open `/examples/tablePrimitiveEvents/`.

The row Options button reads each displayed cell into an object keyed by the configured column names. The footer Save button finds the footer row, collects its form controls, and maps named controls to their current values.

Note: footer extraction depends on the generated input controls having `name` attributes. Controls without names are intentionally omitted by `mapNamedValues`.
