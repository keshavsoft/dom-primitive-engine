# Table + Data List Autocomplete sample

This isolated sample demonstrates the proposed connection in `json-renderers-build` without changing existing samples or source files.

## What it does

- Calls the existing `table` renderer with sample data and columns.
- Calls the existing `dataList` renderer with the same data and column names.
- Adds footer inputs whose `list` attributes match the generated `<datalist>` IDs.
- Checks in the browser that every footer input is connected to a matching data list.

The browser's native `<datalist>` supplies the autocomplete suggestions. For example, typing `Kr` into the `itemName` footer input should suggest `Krishna Mouse`.

## Run

From the `json-renderers-build` repository root:

```bash
npm install
npm run dev
```

Open the Vite URL and navigate to `/samples/tableDataListAutocomplete/`.

Note: this example uses the table builder's current simple table specification and adds the footer inputs in the sample. It does not change the shared table or data-list implementation.
