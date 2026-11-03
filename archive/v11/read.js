export const readText = (element, { trim = true } = {}) => {
  if (!element || !("textContent" in element)) return undefined;
  const value = element.textContent ?? "";
  return trim ? value.trim() : value;
};

export const readValue = (element) => {
  if (!element) return undefined;
  const tag = element.tagName?.toLowerCase();
  const type = element.type?.toLowerCase();
  if (type === "checkbox") return element.checked ? (element.value || true) : false;
  if (type === "radio") return element.checked ? element.value : undefined;
  if (tag === "select" && element.multiple) {
    return Array.from(element.selectedOptions ?? [], option => option.value);
  }
  if ("value" in element && tag !== "button") return element.value;
  return readText(element);
};

/** Map an ordered collection of DOM elements to an object using configured keys. */
export const mapValues = (elements, { columns = [], read = "text" } = {}) => {
  if (!Array.isArray(elements)) {
    throw new TypeError("mapValues expects the previous instruction to return an array.");
  }
  if (!Array.isArray(columns)) {
    throw new TypeError("mapValues arguments.columns must be an array.");
  }
  const result = {};
  elements.forEach((element, index) => {
    const key = columns[index];
    if (typeof key !== "string" || !key) return;
    const value = read === "value" ? readValue(element) : readText(element);
    result[key] = value;
  });
  return result;
};


/** Map named form controls to an object using each control's name attribute. */
export const mapNamedValues = (elements) => {
  if (!Array.isArray(elements)) {
    throw new TypeError("mapNamedValues expects the previous instruction to return an array.");
  }
  const result = {};
  elements.forEach((element) => {
    if (!element.name) return;
    const value = readValue(element);
    if (element.type?.toLowerCase() === "radio" && value === undefined) return;
    if (Object.hasOwn(result, element.name)) {
      if (!Array.isArray(result[element.name])) result[element.name] = [result[element.name]];
      result[element.name].push(value);
    } else {
      result[element.name] = value;
    }
  });
  return result;
};
