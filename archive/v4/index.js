export { runInstructions, instructionOperations } from './runInstructions.js';
export * as find from './primitives/find.js';
export * as read from './primitives/read.js';
export * as navigate from './primitives/navigate.js';
export const meta = Object.freeze({ name: 'DOM Primitive Engine', version: 'V4', instructionFormat: 'JSON' });
