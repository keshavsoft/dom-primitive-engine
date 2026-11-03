const h = {
  version: "1.14.0",
  name: "dom-primitive-engine"
}, b = (e, n = h) => {
  if (!(!e || typeof globalThis > "u"))
    return globalThis.ks ?? (globalThis.ks = {}), globalThis.ks.domPrimitiveEngine = {
      meta: n,
      runInstructions: e
    }, globalThis.ks.domPrimitiveEngine;
}, A = ({ element: e, previousResult: n, instruction: r, clientData: t }) => {
  const o = r.sourcePath.fileName;
  if (o === "root") return e;
  if (o === "previous") return n;
  if (o === "clientData") return t;
}, S = (e, n) => {
  const r = e.arguments ?? {}, t = r.columns ?? n.columns, o = r.options ?? n.options, s = r.data ?? n.data;
  return { ...r, columns: t, options: o, data: s };
}, k = ({ element: e, previousResult: n, instruction: r, clientData: t, operations: o }) => {
  var u;
  const s = A({ element: e, previousResult: n, instruction: r, clientData: t }), c = S(r, t), l = o[r.func] ?? t[r.func] ?? ((u = t == null ? void 0 : t.functions) == null ? void 0 : u[r.func]);
  if (typeof l != "function")
    throw new TypeError(`Unknown primitive operation: "${r.func}"`);
  return l(s, c, t);
}, E = (e, n, r) => {
  const t = e, o = n.selector;
  return t.closest(o);
}, T = (e, n, r) => {
  const t = e, o = n.selector;
  return !t || typeof t.querySelector != "function" ? null : t.querySelector(o);
}, _ = (e, n, r) => {
  const t = e, o = n.selector;
  return Array.from(t.querySelectorAll(o));
}, w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  closest: E,
  querySelector: T,
  querySelectorAll: _
}, Symbol.toStringTag, { value: "Module" })), d = (e, n, r) => {
  const t = e, o = n.trim ?? !0, s = t.textContent ?? "";
  return o ? s.trim() : s;
}, i = (e, n, r) => {
  var c, l, u;
  const t = e, o = (c = t.tagName) == null ? void 0 : c.toLowerCase(), s = (l = t.type) == null ? void 0 : l.toLowerCase();
  return s === "checkbox" ? t.checked ? t.value || !0 : !1 : s === "radio" ? t.checked ? t.value : void 0 : o === "select" && t.multiple ? Array.from(t.selectedOptions, (a) => a.value) : "value" in t && o !== "button" ? t.value : ((u = t.textContent) == null ? void 0 : u.trim()) ?? "";
}, f = (e, n, r) => {
  const t = e, o = n.columns ?? r.columns ?? [], s = n.read ?? "text", c = {};
  return t.forEach((l, u) => {
    const a = o[u];
    if (!a) return;
    const v = s === "value" ? i(l) : d(l, {});
    c[a] = v;
  }), c;
}, y = (e, n, r) => {
  const t = e, o = {};
  return t.forEach((s) => {
    var u;
    const c = s.name;
    if (!c) return;
    const l = i(s);
    ((u = s.type) == null ? void 0 : u.toLowerCase()) === "radio" && l === void 0 || (Object.hasOwn(o, c) ? (Array.isArray(o[c]) || (o[c] = [o[c]]), o[c].push(l)) : o[c] = l);
  }), o;
}, N = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  mapNamedValues: y,
  mapValues: f,
  readText: d,
  readValue: i
}, Symbol.toStringTag, { value: "Module" })), O = (e, n, r) => {
  const t = (n == null ? void 0 : n.key) ?? "Enter", o = e && typeof e == "object" && "key" in e ? e : (n == null ? void 0 : n.event) ?? (r == null ? void 0 : r.event);
  return !o || o.key !== t ? null : o.target ?? o.currentTarget ?? e;
}, P = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isKey: O
}, Symbol.toStringTag, { value: "Module" })), x = { ...w, ...N, ...P }, m = (e, n, r = {}) => {
  let t = e;
  for (const o of n) {
    if (t === null)
      return null;
    t = k({
      element: e,
      previousResult: t,
      instruction: o,
      clientData: r,
      operations: x
    });
  }
  return t;
}, p = (e) => {
  const n = (e == null ? void 0 : e.target) ?? (e == null ? void 0 : e.currentTarget) ?? e;
  if (!n) throw new TypeError("A DOM element or event is required");
  return n;
}, g = (e) => (Array.isArray(e) ? e : (e == null ? void 0 : e.columns) ?? []).map((r) => typeof r == "string" ? r : (r == null ? void 0 : r.columnName) ?? (r == null ? void 0 : r.name) ?? (r == null ? void 0 : r.key)), j = [
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
], q = [
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
], C = (e, n = []) => {
  const r = m(p(e), j);
  return f(r, { columns: g(n), read: "text" });
}, I = (e, n = []) => {
  const r = m(p(e), q);
  return Array.from(r).some((t) => t.name) ? y(r) : f(r, { columns: g(n), read: "value" });
};
b(m);
export {
  I as readFooter,
  C as readRow,
  m as runInstructions
};
