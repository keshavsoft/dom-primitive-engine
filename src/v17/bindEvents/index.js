import getContainer from "./getContainer.js";
import groupBindings from "./groupBindings.js";
import attachListener from "./attachListener.js";

export const bindEvents = (containerOrId, bindings = []) => {
  const container = getContainer(containerOrId);
  if (!container) return null;

  const eventGroups = groupBindings(bindings);
  for (const [eventType, group] of eventGroups.entries()) {
    attachListener(container, eventType, group);
  }

  return container;
};

export default bindEvents;
