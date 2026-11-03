import runInstructions from "../extraction/index.js";

/**
 * Attaches instruction-driven delegated event listeners to a container.
 * 
 * @param {string|Element} containerOrId - Container element or its HTML id.
 * @param {Array<Object>} bindings - Array of event binding configurations.
 * @returns {Element|null} The container element.
 */
export const bindEvents = (containerOrId, bindings = []) => {
  const container = typeof containerOrId === "string"
    ? (document.getElementById(containerOrId) || document.querySelector(containerOrId))
    : containerOrId;

  if (!container) {
    console.warn(`[dom-primitive-engine] bindEvents: Container not found for "${containerOrId}"`);
    return null;
  }

  // Group bindings by event type to attach only ONE listener per event type to the container
  const eventGroups = new Map();
  for (const binding of bindings) {
    if (!binding || !binding.event) continue;
    const list = eventGroups.get(binding.event) ?? [];
    list.push(binding);
    eventGroups.set(binding.event, list);
  }

  for (const [eventType, group] of eventGroups.entries()) {
    container.addEventListener(eventType, (event) => {
      for (const binding of group) {
        const matchElement = event.target?.closest?.(binding.selector);
        if (!matchElement || !container.contains(matchElement)) {
          continue;
        }

        // Determine starting input for the instruction pipeline
        const startInput = (binding.root === "event" || event?.type?.startsWith("key"))
          ? event
          : matchElement;

        const clientData = {
          ...binding.clientData,
          event,
          targetElement: matchElement
        };

        const runner = binding.runner ?? runInstructions;
        const result = runner(startInput, binding.instructions, clientData);

        if (result !== null && result !== undefined && typeof binding.onExtract === "function") {
          binding.onExtract(result, event, matchElement);
        }
      }
    });
  }

  return container;
};

export default bindEvents;
