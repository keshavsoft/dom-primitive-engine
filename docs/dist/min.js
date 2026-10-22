const d = ({ element: n, previousResult: o, instruction: r, clientData: t }) => {
  const e = r.sourcePath.fileName;
  if (e === "root") return n;
  if (e === "previous") return o;
  if (e === "clientData") return t;
}, p = (n, o) => {
  const r = n.arguments ?? {}, t = r.columns ?? o.columns, e = r.options ?? o.options, s = r.data ?? o.data;
  return { ...r, columns: t, options: e, data: s };
}, g = ({ element: n, previousResult: o, instruction: r, clientData: t, operations: e }) => {
  const s = d({ element: n, previousResult: o, instruction: r, clientData: t }), c = p(r, t), u = e[r.func];
  return u(s, c, t);
}, v = (n, o, r) => {
  const t = n, e = o.selector;
  return t.closest(e);
}, y = (n, o, r) => {
  const t = n, e = o.selector;
  return Array.from(t.querySelectorAll(e));
}, h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  closest: v,
  querySelectorAll: y
}, Symbol.toStringTag, { value: "Module" })), m = (n, o, r) => {
  const t = n, e = o.trim ?? !0, s = t.textContent ?? "";
  return e ? s.trim() : s;
}, i = (n, o, r) => {
  var c, u, a;
  const t = n, e = (c = t.tagName) == null ? void 0 : c.toLowerCase(), s = (u = t.type) == null ? void 0 : u.toLowerCase();
  return s === "checkbox" ? t.checked ? t.value || !0 : !1 : s === "radio" ? t.checked ? t.value : void 0 : e === "select" && t.multiple ? Array.from(t.selectedOptions, (l) => l.value) : "value" in t && e !== "button" ? t.value : ((a = t.textContent) == null ? void 0 : a.trim()) ?? "";
}, b = (n, o, r) => {
  const t = n, e = o.columns ?? r.columns ?? [], s = o.read ?? "text", c = {};
  return t.forEach((u, a) => {
    const l = e[a];
    if (!l) return;
    const f = s === "value" ? i(u) : m(u, {});
    c[l] = f;
  }), c;
}, O = (n, o, r) => {
  const t = n, e = {};
  return t.forEach((s) => {
    var a;
    const c = s.name;
    if (!c) return;
    const u = i(s);
    ((a = s.type) == null ? void 0 : a.toLowerCase()) === "radio" && u === void 0 || (Object.hasOwn(e, c) ? (Array.isArray(e[c]) || (e[c] = [e[c]]), e[c].push(u)) : e[c] = u);
  }), e;
}, A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  mapNamedValues: O,
  mapValues: b,
  readText: m,
  readValue: i
}, Symbol.toStringTag, { value: "Module" })), _ = { ...h, ...A }, x = (n, o, r = {}) => {
  let t = n;
  for (const e of o)
    t = g({
      element: n,
      previousResult: t,
      instruction: e,
      clientData: r,
      operations: _
    });
  return t;
}, E = Object.freeze({
  name: "DOM Primitive Engine",
  version: "V12.0.0",
  type: "Client Data Instruction Pipeline"
});
export {
  v as closest,
  O as mapNamedValues,
  b as mapValues,
  E as meta,
  y as querySelectorAll,
  m as readText,
  i as readValue,
  x as runInstructions
};
