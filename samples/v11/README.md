# V11 samples

V11 uses one public API: `runInstructions(rootElement, instructions, clientData)`.

- `table/` demonstrates root → closest row → collect cells → map values using `clientData.columns`.
- `form/` demonstrates root → closest form → collect controls → map named values.

Each instruction is a JSON object with `narration`, `sourcePath`, `func`, and `arguments`.
