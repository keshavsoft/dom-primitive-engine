export const readValue=e=>e&&"value" in e?e.value:undefined;
export const readChecked=e=>e&&"checked" in e?Boolean(e.checked):undefined;
export const readText=(e,{trim=true}={})=>{if(!e||!("textContent" in e))return undefined;const v=e.textContent??"";return trim?v.trim():v};
export const readAttribute=(e,name)=>typeof e?.getAttribute==="function"?e.getAttribute(name):undefined;
export const readAttributes=e=>e?.attributes?Array.from(e.attributes,a=>[a.name,a.value]).reduce((o,[k,v])=>(o[k]=v,o),{}):{};
export const readProperty=(e,key)=>e&&key in e?e[key]:undefined;
export const readControlValue=e=>{if(!e)return undefined;const tag=e.tagName?.toLowerCase(),type=e.type?.toLowerCase();if(type==="checkbox")return e.checked?(e.value||true):false;if(type==="radio")return e.checked?e.value:undefined;if(tag==="select"&&e.multiple)return Array.from(e.selectedOptions,o=>o.value);return "value" in e?e.value:readText(e)};
export const controlsToObject=controls=>{const out={};for(const e of Array.from(controls??[])){const name=e.name||e.getAttribute?.("name");if(!name)continue;const type=e.type?.toLowerCase(),value=readControlValue(e);if(type==="radio"&&value===undefined)continue;if(Object.hasOwn(out,name)){if(!Array.isArray(out[name]))out[name]=[out[name]];if(Array.isArray(value))out[name].push(...value);else out[name].push(value)}else out[name]=value}return out};
