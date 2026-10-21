export const getParent = e => e?.parentElement ?? null;
export const getChildren = e => Array.from(e?.children ?? []);
export const hasChildren = e => Boolean(e?.children?.length);
export const getFirstChild = e => e?.firstElementChild ?? null;
export const getLastChild = e => e?.lastElementChild ?? null;
export const getNextSibling = e => e?.nextElementSibling ?? null;
export const getPreviousSibling = e => e?.previousElementSibling ?? null;
