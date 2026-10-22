const h = ({ element: t, previousResult: n, instruction: e, clientData: r }) => {
  const o = e.sourcePath.fileName;
  if (o === "root") return t;
  if (o === "previous") return n;
  if (o === "clientData") return r;
}, A = (t, n) => {
  const e = t.arguments ?? {}, r = e.columns ?? n.columns, o = e.options ?? n.options, s = e.data ?? n.data;
  return { ...e, columns: r, options: o, data: s };
}, b = ({ element: t, previousResult: n, instruction: e, clientData: r, operations: o }) => {
  const s = h({ element: t, previousResult: n, instruction: e, clientData: r }), a = A(e, r), c = o[e.func];
  return c(s, a, r);
}, N = (t, n, e) => {
  const r = t, o = n.selector;
  return r.closest(o);
}, O = (t, n, e) => {
  const r = t, o = n.selector;
  return Array.from(r.querySelectorAll(o));
}, x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  closest: N,
  querySelectorAll: O
}, Symbol.toStringTag, { value: "Module" })), m = (t, n, e) => {
  const r = t, o = n.trim ?? !0, s = r.textContent ?? "";
  return o ? s.trim() : s;
}, l = (t, n, e) => {
  var a, c, u;
  const r = t, o = (a = r.tagName) == null ? void 0 : a.toLowerCase(), s = (c = r.type) == null ? void 0 : c.toLowerCase();
  return s === "checkbox" ? r.checked ? r.value || !0 : !1 : s === "radio" ? r.checked ? r.value : void 0 : o === "select" && r.multiple ? Array.from(r.selectedOptions, (i) => i.value) : "value" in r && o !== "button" ? r.value : ((u = r.textContent) == null ? void 0 : u.trim()) ?? "";
}, f = (t, n, e) => {
  const r = t, o = n.columns ?? e.columns ?? [], s = n.read ?? "text", a = {};
  return r.forEach((c, u) => {
    const i = o[u];
    if (!i) return;
    const v = s === "value" ? l(c) : m(c, {});
    a[i] = v;
  }), a;
}, d = (t, n, e) => {
  const r = t, o = {};
  return r.forEach((s) => {
    var u;
    const a = s.name;
    if (!a) return;
    const c = l(s);
    ((u = s.type) == null ? void 0 : u.toLowerCase()) === "radio" && c === void 0 || (Object.hasOwn(o, a) ? (Array.isArray(o[a]) || (o[a] = [o[a]]), o[a].push(c)) : o[a] = c);
  }), o;
}, E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  mapNamedValues: d,
  mapValues: f,
  readText: m,
  readValue: l
}, Symbol.toStringTag, { value: "Module" })), P = { ...x, ...E }, p = (t, n, e = {}) => {
  let r = t;
  for (const o of n)
    r = b({
      element: t,
      previousResult: r,
      instruction: o,
      clientData: e,
      operations: P
    });
  return r;
}, g = (t) => {
  const n = (t == null ? void 0 : t.target) ?? (t == null ? void 0 : t.currentTarget) ?? t;
  if (!n) throw new TypeError("A DOM element or event is required");
  return n;
}, y = (t) => (Array.isArray(t) ? t : (t == null ? void 0 : t.columns) ?? []).map((e) => typeof e == "string" ? e : (e == null ? void 0 : e.columnName) ?? (e == null ? void 0 : e.name) ?? (e == null ? void 0 : e.key)), S = [
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
], w = [
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
], _ = (t, n = []) => {
  const e = p(g(t), S);
  return f(e, { columns: y(n), read: "text" });
}, C = (t, n = []) => {
  const e = p(g(t), w);
  return Array.from(e).some((r) => r.name) ? d(e) : f(e, { columns: y(n), read: "value" });
}, j = Object.freeze({
  name: "DOM Primitive Engine",
  version: "V12.0.0",
  type: "Client Data Instruction Pipeline"
});
export {
  N as closest,
  d as mapNamedValues,
  f as mapValues,
  j as meta,
  O as querySelectorAll,
  C as readFooter,
  _ as readRow,
  m as readText,
  l as readValue,
  p as runInstructions
};
