# V9 examples

Start at `index.html`, then choose one small, independent example:

- `table/` — the caller supplies column keys in `js/contract.js`; the action column is excluded from selected cells.
- `form/` — controls provide their keys through their `name` attributes.

Each example separates the HTML contract, pipeline contract, extraction adapter, and event wiring into small files under its own `js/` folder.

Serve the repository root (for example, `npx serve .`) so browser module imports can reach `src/index.js`.
