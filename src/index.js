import mermaid, {mermaidAPI} from "mermaid";

console.log(mermaid);
mermaidAPI.initialize({
  startOnLoad: false,
});

const graphCode = document.querySelector("#graph-code");
const bindEvents = (elem) => {
  ["customer", "order", "lineitem", "deliveryaddress"].forEach((entity) => {
    const entityElem = elem.querySelector(`#${entity}`);
    if(entityElem===null) { return; }
    entityElem.addEventListener("click", () => {
      console.log(`${entity} clicked from SVG`);
    })
  })
}

const render = (graph) => {
  const elem = document.querySelector(".graph-display");
  elem.innerHTML = "";
  const onRendered = (svgCode) => {
    elem.innerHTML = svgCode;
    bindEvents(elem);
    // document.getElementById('dgraph-display').remove();
  }
  mermaidAPI.render('graph-display', graph, onRendered)
}

const tryRender = (graph) => {
  try {
    mermaidAPI.parse(graph);
    render(graph);
  } catch(err) {
    console.log(err);
  }
}

graphCode.addEventListener('change', (e) => {
  const graph = e.target.value;
  tryRender(graph);
})

tryRender(graphCode.value);
