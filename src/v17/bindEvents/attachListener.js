import executeBinding from "./executeBinding.js";

const attachListener = (container, eventType, bindings) => {
  container.addEventListener(eventType, (event) => {
    for (const binding of bindings) {
      const matchElement = event.target?.closest?.(binding.selector);
      if (!matchElement || !container.contains(matchElement)) {
        continue;
      }

      executeBinding({ binding, event, matchElement });
    }
  });
};

export default attachListener;

