import readValue from "./readValue.js";

const mapNamedValues = (input, args, clientData) => {
  const elements = input;
  // args and clientData are not needed because each control supplies its own name.

  const result = {};
  elements.forEach((element) => {
    const key = element.name;
    if (!key) return;

    const value = readValue(element, {}, clientData);
    if (element.type?.toLowerCase() === "radio" && value === undefined) return;

    if (Object.hasOwn(result, key)) {
      if (!Array.isArray(result[key])) result[key] = [result[key]];
      result[key].push(value);
    } else {
      result[key] = value;
    }
  });

  return result;
};

export default mapNamedValues;
