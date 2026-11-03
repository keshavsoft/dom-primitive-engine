const getContainer = (containerOrId) => {
  if (typeof containerOrId === "string") {
    return document.getElementById(containerOrId) || document.querySelector(containerOrId);
  }

  return containerOrId ?? null;
};

export default getContainer;

