const k = {
  version: "1.14.0",
  name: "dom-primitive-engine"
}, A = (e, o, t = k) => {
  if (!(!e || typeof globalThis > "u"))
    return globalThis.ks ?? (globalThis.ks = {}), globalThis.ks.domPrimitiveEngine = {
      meta: t,
      runInstructions: e,
      bindEvents: o
    }, globalThis.ks.domPrimitiveEngine;
}, w = ({ element: e, previousResult: o, instruction: t, clientData: n }) => {
  const r = t.sourcePath.fileName;
  if (r === "root") return e;
  if (r === "previous") return o;
  if (r === "clientData") return n;
}, T = (e, o) => {
  const t = e.arguments ?? {}, n = t.columns ?? o.columns, r = t.options ?? o.options, c = t.data ?? o.data;
  return { ...t, columns: n, options: r, data: c };
}, _ = ({ element: e, previousResult: o, instruction: t, clientData: n, operations: r }) => {
  var l;
  const c = w({ element: e, previousResult: o, instruction: t, clientData: n }), s = T(t, n), u = r[t.func] ?? n[t.func] ?? ((l = n == null ? void 0 : n.functions) == null ? void 0 : l[t.func]);
  if (typeof u != "function")
    throw new TypeError(`Unknown primitive operation: "${t.func}"`);
  return u(c, s, n);
}, x = (e, o, t) => {
  const n = e, r = o.selector;
  return n.closest(r);
}, N = (e, o, t) => {
  const n = e, r = o.selector;
  return !n || typeof n.querySelector != "function" ? null : n.querySelector(r);
}, P = (e, o, t) => {
  const n = e, r = o.selector;
  return Array.from(n.querySelectorAll(r));
}, q = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  closest: x,
  querySelector: N,
  querySelectorAll: P
}, Symbol.toStringTag, { value: "Module" })), g = (e, o, t) => {
  const n = e, r = o.trim ?? !0, c = n.textContent ?? "";
  return r ? c.trim() : c;
}, y = (e, o, t) => {
  var s, u, l;
  const n = e, r = (s = n.tagName) == null ? void 0 : s.toLowerCase(), c = (u = n.type) == null ? void 0 : u.toLowerCase();
  return c === "checkbox" ? n.checked ? n.value || !0 : !1 : c === "radio" ? n.checked ? n.value : void 0 : r === "select" && n.multiple ? Array.from(n.selectedOptions, (a) => a.value) : "value" in n && r !== "button" ? n.value : ((l = n.textContent) == null ? void 0 : l.trim()) ?? "";
}, p = (e, o, t) => {
  const n = e, r = o.columns ?? t.columns ?? [], c = o.read ?? "text", s = {};
  return n.forEach((u, l) => {
    const a = r[l];
    if (!a) return;
    const i = c === "value" ? y(u) : g(u, {});
    s[a] = i;
  }), s;
}, v = (e, o, t) => {
  const n = e, r = {};
  return n.forEach((c) => {
    var l;
    const s = c.name;
    if (!s) return;
    const u = y(c);
    ((l = c.type) == null ? void 0 : l.toLowerCase()) === "radio" && u === void 0 || (Object.hasOwn(r, s) ? (Array.isArray(r[s]) || (r[s] = [r[s]]), r[s].push(u)) : r[s] = u);
  }), r;
}, j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  mapNamedValues: v,
  mapValues: p,
  readText: g,
  readValue: y
}, Symbol.toStringTag, { value: "Module" })), C = (e, o, t) => {
  const n = (o == null ? void 0 : o.key) ?? "Enter", r = e && typeof e == "object" && "key" in e ? e : (o == null ? void 0 : o.event) ?? (t == null ? void 0 : t.event);
  return !r || r.key !== n ? null : r.target ?? r.currentTarget ?? e;
}, O = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isKey: C
}, Symbol.toStringTag, { value: "Module" })), M = { ...q, ...j, ...O }, m = (e, o, t = {}) => {
  let n = e;
  for (const r of o) {
    if (n === null)
      return null;
    n = _({
      element: e,
      previousResult: n,
      instruction: r,
      clientData: t,
      operations: M
    });
  }
  return n;
}, L = (e, o = []) => {
  const t = typeof e == "string" ? document.getElementById(e) || document.querySelector(e) : e;
  if (!t)
    return console.warn(`[dom-primitive-engine] bindEvents: Container not found for "${e}"`), null;
  const n = /* @__PURE__ */ new Map();
  for (const r of o) {
    if (!r || !r.event) continue;
    const c = n.get(r.event) ?? [];
    c.push(r), n.set(r.event, c);
  }
  for (const [r, c] of n.entries())
    t.addEventListener(r, (s) => {
      var u, l, a;
      for (const i of c) {
        const f = (l = (u = s.target) == null ? void 0 : u.closest) == null ? void 0 : l.call(u, i.selector);
        if (!f || !t.contains(f))
          continue;
        const E = i.root === "event" || (a = s == null ? void 0 : s.type) != null && a.startsWith("key") ? s : f, S = {
          ...i.clientData,
          event: s,
          targetElement: f
        }, d = m(E, i.instructions, S);
        d != null && typeof i.onExtract == "function" && i.onExtract(d, s, f);
      }
    });
  return t;
}, h = (e) => {
  const o = (e == null ? void 0 : e.target) ?? (e == null ? void 0 : e.currentTarget) ?? e;
  if (!o) throw new TypeError("A DOM element or event is required");
  return o;
}, b = (e) => (Array.isArray(e) ? e : (e == null ? void 0 : e.columns) ?? []).map((t) => typeof t == "string" ? t : (t == null ? void 0 : t.columnName) ?? (t == null ? void 0 : t.name) ?? (t == null ? void 0 : t.key)), z = [
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
], R = [
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
], V = (e, o = []) => {
  const t = m(h(e), z);
  return p(t, { columns: b(o), read: "text" });
}, F = (e, o = []) => {
  const t = m(h(e), R);
  return Array.from(t).some((n) => n.name) ? v(t) : p(t, { columns: b(o), read: "value" });
};
A(m, L);
export {
  L as bindEvents,
  F as readFooter,
  V as readRow,
  m as runInstructions
};
