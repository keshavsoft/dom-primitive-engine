# V10 samples

V10 executes JSON instructions with a consistent structure:

- `narration`: human-readable purpose of the step.
- `sourcePath.fileName`: `root` for the externally supplied element or `previous` for the preceding step's output.
- `func`: registered operation to execute.
- `arguments`: operation-specific configuration.

Open `index.html` through a local static server. The table sample loads `table/instructions.json`; the form sample loads `form/instructions.json`.
