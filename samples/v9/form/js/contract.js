// Named form controls provide their own keys.
export const instructions = [
  { op: "closest", args: { selector: "form" } },
  { op: "queryAll", args: { selector: "input[name], select[name], textarea[name]" } },
  { op: "toObject" }
];
