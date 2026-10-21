// The caller supplies the field names and the ordered pipeline.
export const instructions = [
  { op: "closest", args: { selector: "tr" } },
  { op: "queryAll", args: { selector: "td:not(:last-child)" } },
  { op: "toObject", args: {
    columns: ["itemName", "category", "price"],
    read: "text"
  } }
];
