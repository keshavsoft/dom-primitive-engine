const readValue = (input, args, clientData) => {
  const element = input;
  const tagName = element.tagName?.toLowerCase();
  const type = element.type?.toLowerCase();
  // args and clientData are not used to read the current control value.

  if (type === "checkbox") return element.checked ? (element.value || true) : false;
  if (type === "radio") return element.checked ? element.value : undefined;
  if (tagName === "select" && element.multiple) {
    return Array.from(element.selectedOptions, option => option.value);
  }
  if ("value" in element && tagName !== "button") return element.value;

  return element.textContent?.trim() ?? "";
};

export default readValue;
