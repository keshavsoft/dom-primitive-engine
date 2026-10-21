const need = (target, method) => {
  if (!target || typeof target[method] !== 'function') {
    throw new TypeError(`Expected an object with ${method}()`);
  }
};

export const closest = (start, selector) => (need(start, 'closest'), start.closest(selector));
export const queryOne = (root, selector) => (need(root, 'querySelector'), root.querySelector(selector));
export const queryAll = (root, selector) => (need(root, 'querySelectorAll'), root.querySelectorAll(selector));
export const getById = (root, id) => (need(root, 'getElementById'), root.getElementById(id));
export const getByClassName = (root, name) => (need(root, 'getElementsByClassName'), root.getElementsByClassName(name));
export const getByTagName = (root, name) => (need(root, 'getElementsByTagName'), root.getElementsByTagName(name));
export const matches = (element, selector) => (need(element, 'matches'), element.matches(selector));
