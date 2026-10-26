const v = {
  version: "1.13.0",
  name: "dom-primitive-engine"
}, b = (e, n = v) => {
  if (!(!e || typeof globalThis > "u"))
    return globalThis.ks ?? (globalThis.ks = {}), globalThis.ks.domPrimitiveEngine = {
      meta: n,
      runInstructions: e
    }, globalThis.ks.domPrimitiveEngine;
}, A = ({ element: e, previousResult: n, instruction: t, clientData: r }) => {
  const o = t.sourcePath.fileName;
  if (o === "root") return e;
  if (o === "previous") return n;
  if (o === "clientData") return r;
}, E = (e, n) => {
  const t = e.arguments ?? {}, r = t.columns ?? n.columns, o = t.options ?? n.options, s = t.data ?? n.data;
  return { ...t, columns: r, options: o, data: s };
}, N = ({ element: e, previousResult: n, instruction: t, clientData: r, operations: o }) => {
  const s = A({ element: e, previousResult: n, instruction: t, clientData: r }), a = E(t, r), c = o[t.func];
  return c(s, a, r);
}, k = (e, n, t) => {
  const r = e, o = n.selector;
  return r.closest(o);
}, x = (e, n, t) => {
  const r = e, o = n.selector;
  return Array.from(r.querySelectorAll(o));
}, P = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  closest: k,
  querySelectorAll: x
}, Symbol.toStringTag, { value: "Module" })), d = (e, n, t) => {
  const r = e, o = n.trim ?? !0, s = r.textContent ?? "";
  return o ? s.trim() : s;
}, u = (e, n, t) => {
  var a, c, i;
  const r = e, o = (a = r.tagName) == null ? void 0 : a.toLowerCase(), s = (c = r.type) == null ? void 0 : c.toLowerCase();
  return s === "checkbox" ? r.checked ? r.value || !0 : !1 : s === "radio" ? r.checked ? r.value : void 0 : o === "select" && r.multiple ? Array.from(r.selectedOptions, (l) => l.value) : "value" in r && o !== "button" ? r.value : ((i = r.textContent) == null ? void 0 : i.trim()) ?? "";
}, f = (e, n, t) => {
  const r = e, o = n.columns ?? t.columns ?? [], s = n.read ?? "text", a = {};
  return r.forEach((c, i) => {
    const l = o[i];
    if (!l) return;
    const h = s === "value" ? u(c) : d(c, {});
    a[l] = h;
  }), a;
}, g = (e, n, t) => {
  const r = e, o = {};
  return r.forEach((s) => {
    var i;
    const a = s.name;
    if (!a) return;
    const c = u(s);
    ((i = s.type) == null ? void 0 : i.toLowerCase()) === "radio" && c === void 0 || (Object.hasOwn(o, a) ? (Array.isArray(o[a]) || (o[a] = [o[a]]), o[a].push(c)) : o[a] = c);
  }), o;
}, S = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  mapNamedValues: g,
  mapValues: f,
  readText: d,
  readValue: u
}, Symbol.toStringTag, { value: "Module" })), T = { ...P, ...S }, m = (e, n, t = {}) => {
  let r = e;
  for (const o of n)
    r = N({
      element: e,
      previousResult: r,
      instruction: o,
      clientData: t,
      operations: T
    });
  return r;
}, p = (e) => {
  const n = (e == null ? void 0 : e.target) ?? (e == null ? void 0 : e.currentTarget) ?? e;
  if (!n) throw new TypeError("A DOM element or event is required");
  return n;
}, y = (e) => (Array.isArray(e) ? e : (e == null ? void 0 : e.columns) ?? []).map((t) => typeof t == "string" ? t : (t == null ? void 0 : t.columnName) ?? (t == null ? void 0 : t.name) ?? (t == null ? void 0 : t.key)), w = [
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
], O = [
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
], _ = (e, n = []) => {
  const t = m(p(e), w);
  return f(t, { columns: y(n), read: "text" });
}, C = (e, n = []) => {
  const t = m(p(e), O);
  return Array.from(t).some((r) => r.name) ? g(t) : f(t, { columns: y(n), read: "value" });
};
b(m);
export {
  C as readFooter,
  _ as readRow,
  m as runInstructions
};
