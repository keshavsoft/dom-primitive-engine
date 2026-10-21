// Pure primitive functions for reading values and reducing collections to objects

export const readControlValue = (element) => {
  if (!element) return undefined;
  const tag = element.tagName?.toLowerCase();
  const type = element.type?.toLowerCase();

  if (type === 'checkbox') {
    return element.checked ? (element.value || true) : false;
  }
  if (type === 'radio') {
    return element.checked ? element.value : undefined;
  }
  if (tag === 'select' && element.multiple) {
    return Array.from(element.selectedOptions || [], opt => opt.value);
  }
  if ('value' in element) {
    return element.value;
  }
  return element.textContent?.trim();
};

export const collectionToObject = (elements = []) => {
  const result = {};
  for (const el of Array.from(elements)) {
    const key = el.name || el.getAttribute?.('data-field') || el.id;
    if (!key) continue;

    const value = readControlValue(el);
    if (el.type === 'radio' && value === undefined) continue;

    if (Object.hasOwn(result, key)) {
      if (!Array.isArray(result[key])) {
        result[key] = [result[key]];
      }
      result[key].push(value);
    } else {
      result[key] = value;
    }
  }
  return result;
};
