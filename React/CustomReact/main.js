import ReactElement from "./index.js";
const root = document.getElementById("root");

function customRender(root, ReactElement) {
  const elem = document.createElement(ReactElement.type);
  elem.setAttribute("href", ReactElement.props.href);
  elem.setAttribute("target", ReactElement.props.target);
  elem.innerHTML = ReactElement.props.children;

  root.innerHTML = ""
  root.appendChild(elem)
}

customRender(root, ReactElement);
