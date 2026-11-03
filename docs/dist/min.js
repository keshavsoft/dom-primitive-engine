const h = {
  version: "1.17.0",
  name: "dom-primitive-engine"
}, E = (e, n, t = h) => {
  if (!(!e || typeof globalThis > "u"))
    return globalThis.ks ?? (globalThis.ks = {}), globalThis.ks.domPrimitiveEngine = {
      meta: t,
      runInstructions: e,
      bindEvents: n
    }, globalThis.ks.domPrimitiveEngine;
}, S = ({ element: e, previousResult: n, instruction: t, clientData: r }) => {
  const o = t.sourcePath.fileName;
  if (o === "root") return e;
  if (o === "previous") return n;
  if (o === "clientData") return r;
}, b = (e, n) => {
  const t = e.arguments ?? {}, r = t.columns ?? n.columns, o = t.options ?? n.options, c = t.data ?? n.data;
  return { ...t, columns: r, options: o, data: c };
}, k = ({ element: e, previousResult: n, instruction: t, clientData: r, operations: o }) => {
  var l;
  const c = S({ element: e, previousResult: n, instruction: t, clientData: r }), s = b(t, r), u = o[t.func] ?? r[t.func] ?? ((l = r == null ? void 0 : r.functions) == null ? void 0 : l[t.func]);
  if (typeof u != "function")
    throw new TypeError(`Unknown primitive operation: "${t.func}"`);
  return u(c, s, r);
}, A = (e, n, t) => {
  const r = e, o = n.selector;
  return r.closest(o);
}, T = (e, n, t) => {
  const r = e, o = n.selector;
  return !r || typeof r.querySelector != "function" ? null : r.querySelector(o);
}, w = (e, n, t) => {
  const r = e, o = n.selector;
  return Array.from(r.querySelectorAll(o));
}, x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  closest: A,
  querySelector: T,
  querySelectorAll: w
}, Symbol.toStringTag, { value: "Module" })), p = (e, n, t) => {
  const r = e, o = n.trim ?? !0, c = r.textContent ?? "";
  return o ? c.trim() : c;
}, f = (e, n, t) => {
  var s, u, l;
  const r = e, o = (s = r.tagName) == null ? void 0 : s.toLowerCase(), c = (u = r.type) == null ? void 0 : u.toLowerCase();
  return c === "checkbox" ? r.checked ? r.value || !0 : !1 : c === "radio" ? r.checked ? r.value : void 0 : o === "select" && r.multiple ? Array.from(r.selectedOptions, (a) => a.value) : "value" in r && o !== "button" ? r.value : ((l = r.textContent) == null ? void 0 : l.trim()) ?? "";
}, m = (e, n, t) => {
  const r = e, o = n.columns ?? t.columns ?? [], c = n.read ?? "text", s = {};
  return r.forEach((u, l) => {
    const a = o[l];
    if (!a) return;
    const v = c === "value" ? f(u) : p(u, {});
    s[a] = v;
  }), s;
}, y = (e, n, t) => {
  const r = e, o = {};
  return r.forEach((c) => {
    var l;
    const s = c.name;
    if (!s) return;
    const u = f(c);
    ((l = c.type) == null ? void 0 : l.toLowerCase()) === "radio" && u === void 0 || (Object.hasOwn(o, s) ? (Array.isArray(o[s]) || (o[s] = [o[s]]), o[s].push(u)) : o[s] = u);
  }), o;
}, _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  mapNamedValues: y,
  mapValues: m,
  readText: p,
  readValue: f
}, Symbol.toStringTag, { value: "Module" })), N = (e, n, t) => {
  const r = (n == null ? void 0 : n.key) ?? "Enter", o = e && typeof e == "object" && "key" in e ? e : (n == null ? void 0 : n.event) ?? (t == null ? void 0 : t.event);
  return !o || o.key !== r ? null : o.target ?? o.currentTarget ?? e;
}, P = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isKey: N
}, Symbol.toStringTag, { value: "Module" })), q = { ...x, ..._, ...P }, i = (e, n, t = {}) => {
  let r = e;
  for (const o of n) {
    if (r === null)
      return null;
    r = k({
      element: e,
      previousResult: r,
      instruction: o,
      clientData: t,
      operations: q
    });
  }
  return r;
}, d = (e) => {
  const n = (e == null ? void 0 : e.target) ?? (e == null ? void 0 : e.currentTarget) ?? e;
  if (!n) throw new TypeError("A DOM element or event is required");
  return n;
}, g = (e) => (Array.isArray(e) ? e : (e == null ? void 0 : e.columns) ?? []).map((t) => typeof t == "string" ? t : (t == null ? void 0 : t.columnName) ?? (t == null ? void 0 : t.name) ?? (t == null ? void 0 : t.key)), j = [
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
], C = [
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
], V = (e, n = []) => {
  const t = i(d(e), j);
  return m(t, { columns: g(n), read: "text" });
}, F = (e, n = []) => {
  const t = i(d(e), C);
  return Array.from(t).some((r) => r.name) ? y(t) : m(t, { columns: g(n), read: "value" });
}, O = (e) => typeof e == "string" ? document.getElementById(e) || document.querySelector(e) : e ?? null, L = (e = []) => {
  const n = /* @__PURE__ */ new Map();
  for (const t of e) {
    if (!(t != null && t.event)) continue;
    const r = n.get(t.event) ?? [];
    r.push(t), n.set(t.event, r);
  }
  return n;
}, M = (e, n, t) => {
  var r;
  return e.root === "event" || (r = n == null ? void 0 : n.type) != null && r.startsWith("key") ? n : t;
}, I = (e, n, t) => ({
  ...e.clientData,
  event: n,
  targetElement: t
}), z = ({ binding: e, event: n, matchElement: t }) => {
  const r = M(e, n, t), o = I(e, n, t), s = (e.runner ?? i)(r, e.instructions, o);
  return s != null && typeof e.onExtract == "function" && e.onExtract(s, n, t), s;
}, B = (e, n, t) => {
  e.addEventListener(n, (r) => {
    var o, c;
    for (const s of t) {
      const u = (c = (o = r.target) == null ? void 0 : o.closest) == null ? void 0 : c.call(o, s.selector);
      !u || !e.contains(u) || z({ binding: s, event: r, matchElement: u });
    }
  });
}, R = (e, n = []) => {
  const t = O(e);
  if (!t) return null;
  const r = L(n);
  for (const [o, c] of r.entries())
    B(t, o, c);
  return t;
};
E(i, R);
export {
  R as bindEvents,
  F as readFooter,
  V as readRow,
  i as runInstructions
};
