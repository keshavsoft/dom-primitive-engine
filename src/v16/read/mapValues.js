import readText from "./readText.js";
import readValue from "./readValue.js";

const mapValues = (input, args, clientData) => {
  const elements = input;
  const columns = args.columns ?? clientData.columns ?? [];
  const read = args.read ?? "text";
  // options and data are not used by this operation.

  const result = {};
  elements.forEach((element, index) => {
    const key = columns[index];
    if (!key) return;

    const value = read === "value"
      ? readValue(element, {}, clientData)
      : readText(element, {}, clientData);

    result[key] = value;
  });

  return result;
};

export default mapValues;
