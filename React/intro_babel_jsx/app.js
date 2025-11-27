// const elem = React.createElement(
//   "h1",
//   {
//     id: "iamid",
//   },
//   "Hello i Am children "
// );


const elem = <h1 id="iamid">hello bro how are you </h1>
console.log(elem)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(elem)