const requireMethod = (target, method) => {
  if (!target || typeof target[method] !== "function") {
    throw new TypeError(`Expected an object with ${method}()`);
  }
};

export const closest = (start, selector) => {
  requireMethod(start, "closest");
  return start.closest(selector);
};

export const queryAll = (root, selector) => {
  requireMethod(root, "querySelectorAll");
  return Array.from(root.querySelectorAll(selector));
};

export const queryOne = (root, selector) => {
  requireMethod(root, "querySelector");
  return root.querySelector(selector);
};