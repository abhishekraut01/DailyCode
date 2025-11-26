// const React = {
//   createElement: function createElement(tag, attributes, children) {
//     const element = document.createElement(tag);
//     element.innerText = children;

//     for (let key in attributes) {
//       if (key === "style") {
//         Object.assign(element.style, attributes.style);
//       } else {
//         element[key] = attributes[key];
//       }
//     }
//     return element;
//   },
// };

// const ReactDOM = {
//   render: function (element, root) {
//     root.appendChild(element);
//   },
// };

const elem1 = React.createElement(
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

const root = document.getElementById("root");
ReactDOM.render(elem1, root);



