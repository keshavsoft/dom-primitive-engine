import runInstructions from "./runInstructions.js";
import mapNamedValues from "./read/mapNamedValues.js";
import mapValues from "./read/mapValues.js";

const getStartElement = (source) => {
  const element = source?.target ?? source?.currentTarget ?? source;
  if (!element) throw new TypeError("A DOM element or event is required");
  return element;
};

const getColumnNames = (columns) => {
  const list = Array.isArray(columns) ? columns : columns?.columns ?? [];
  return list.map((column) => {
    if (typeof column === "string") return column;
    return column?.columnName ?? column?.name ?? column?.key;
  });
};

const readRowInstructions = [
  {
    sourcePath: { fileName: "root" },
    func: "closest",
    arguments: { selector: "tr" }
  },
  {
    sourcePath: { fileName: "previous" },
    func: "querySelectorAll",
    arguments: { selector: "td:not(:last-child)" }
  }
];

const readFooterInstructions = [
  {
    sourcePath: { fileName: "root" },
    func: "closest",
    arguments: { selector: "tfoot" }
  },
  {
    sourcePath: { fileName: "previous" },
    func: "querySelectorAll",
    arguments: { selector: "input, select, textarea" }
  }
];

/** Read a table row as an object, using column names in DOM order. */
export const readRow = (source, columns = []) => {
  const cells = runInstructions(getStartElement(source), readRowInstructions);
  return mapValues(cells, { columns: getColumnNames(columns), read: "text" });
};

/** Read footer controls by their names, or by the supplied columns if unnamed. */
export const readFooter = (source, columns = []) => {
  const controls = runInstructions(getStartElement(source), readFooterInstructions);
  if (Array.from(controls).some((control) => control.name)) {
    return mapNamedValues(controls);
  }
  return mapValues(controls, { columns: getColumnNames(columns), read: "value" });
};
