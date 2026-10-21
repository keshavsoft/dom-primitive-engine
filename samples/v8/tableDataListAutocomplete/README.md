# Table + Data List Autocomplete sample

This sample connects the generated table and footer controls to the DOM Primitive Engine V8 recipes.

## What it does

- Calls the existing `table.withFooter` renderer and the `dataList` renderer with the same data and columns.
- Hooks each generated row's **show** button to a V8 row recipe and displays the extracted object.
- Hooks footer input events to a V8 footer recipe and displays the current autocomplete values.
- Checks that the generated footer inputs point to populated `<datalist>` elements.

The browser's native `<datalist>` supplies the autocomplete suggestions. For example, typing `Kr` into the `itemName` footer input should suggest `Krishna Mouse`. The listener recipes are in `instructions.json`.

## Run

From the `dom-primitive-engine` repository root:

```bash
npm run dev
```

Open the Vite URL and navigate to `/samples/v8/tableDataListAutocomplete/`.

The sample marks the generated body cells with their column names after rendering so the row recipe can return a named object. It does not change the shared table or data-list implementation.
