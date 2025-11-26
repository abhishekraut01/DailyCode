function createElement(tag, attributes, children) {
  const element = document.createElement(tag);
  element.innerText = children;

  for (let key in attributes) {
    if (key === "style") {
      Object.assign(element.style, attributes.style);
    } else {
      element[key] = attributes[key];
    }
  }
  return element;
}

const elem1 = createElement(
  "h1",
  {
    className: "iamheader",
    id: "iamHeaderId",
    style: {
      backgroundColor: "pink",
      color: "green",
    },
  },
  "I am trying to create my custom react"
);


root.appendChild(elem1);
