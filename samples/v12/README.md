# V12 — one contract, visible story

Every primitive receives `(input, args, clientData)`. Each operation names the local values it uses and notes which shared inputs it does not need.

- `find/` contains DOM selection operations.
- `read/` contains value reading and mapping operations.
- `runInstructions.js` selects the operation and carries the previous result forward.
- `getInput.js` resolves the source for an instruction.
- `getArguments.js` combines instruction arguments with caller-provided client data.

Open `table/` to extract a row object, or `form/` to extract named form controls. V11 remains unchanged.
