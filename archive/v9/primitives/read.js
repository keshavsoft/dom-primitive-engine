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

export const readText = (element, { trim = true } = {}) => {
  if (!element || !("textContent" in element)) return undefined;
  const value = element.textContent ?? "";
  return trim ? value.trim() : value;
};

export const toArray = (elements, { read = "value" } = {}) =>
  Array.from(elements ?? [], element => read === "text" ? readText(element) : readValue(element));

export const toObject = (elements, { columns, keyAttribute = "data-field", read = "auto" } = {}) => {
  const items = Array.from(elements ?? []);
  const keys = Array.isArray(columns) ? columns : null;
  const result = {};

  items.forEach((element, index) => {
    const key = keys?.[index] ??
      element.getAttribute?.(keyAttribute) ??
      element.name ??
      element.id;

    if (!key) return;

    let value;
    if (read === "text") value = readText(element);
    else if (read === "value") value = readValue(element);
    else value = ("value" in element && element.tagName?.toLowerCase() !== "td")
      ? readValue(element)
      : readText(element);

    if (element.type?.toLowerCase() === "radio" && value === undefined) return;

    if (Object.hasOwn(result, key)) {
      if (!Array.isArray(result[key])) result[key] = [result[key]];
      result[key].push(value);
    } else {
      result[key] = value;
    }
  });

  return result;
};