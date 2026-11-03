const requireMethod = (target, method) => {
  if (!target || typeof target[method] !== "function") {
    throw new TypeError(`Expected an input object with ${method}()`);
  }
};

export const closest = (element, selector) => {
  requireMethod(element, "closest");
  return element.closest(selector);
};

export const querySelectorAll = (element, selector) => {
  requireMethod(element, "querySelectorAll");
  return Array.from(element.querySelectorAll(selector));
};
