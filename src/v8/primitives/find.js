// Pure primitive functions for traversing and querying the DOM

export const findClosest = (startElement, selector) => {
  if (!startElement || typeof startElement.closest !== 'function') return null;
  return startElement.closest(selector);
};

export const queryAll = (rootElement, selector) => {
  if (!rootElement || typeof rootElement.querySelectorAll !== 'function') return [];
  return Array.from(rootElement.querySelectorAll(selector));
};

export const queryOne = (rootElement, selector) => {
  if (!rootElement || typeof rootElement.querySelector !== 'function') return null;
  return rootElement.querySelector(selector);
};
