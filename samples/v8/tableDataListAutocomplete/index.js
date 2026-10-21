import "https://keshavsoft.github.io/json-renderers/dist/v19/min.js";

const data = [
  { itemName: "Keyboard", category: "Accessories" },
  { itemName: "Krishna Mouse", category: "Accessories" },
  { itemName: "Monitor", category: "Displays" },
  { itemName: "KeshavSoft Laptop", category: "Computers" },
  { itemName: "USB Cable", category: "Accessories" }
];

const columns = [
  { columnName: "itemName", width: "60%" },
  { columnName: "category", width: "40%" }
];

const start = () => {
  try {
    // Build the table specification using the table renderer.
    window.ks.jsonRenderers.render({
      type: "table.withFooter", columns, data,
      targetHtmlId: "dom-render-container",
      classToApply: "",
      appendPosition: "",
      options: {
        showSerial: true,
        showOptions:true
      }
    });

    window.ks.jsonRenderers.render({
      type: "dataList", columns, data,
      targetHtmlId: "dataListsId",
      classToApply: "",
      appendPosition: ""
    });
  } catch (error) {
    console.error(error);
  }
};

start();
