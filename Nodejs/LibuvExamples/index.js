const fs = require("fs");

setImmediate(() => console.log("execute setImmediate"));
setTimeout(() => console.log("execute timeout 0 second wala"), 0);

Promise.resolve("resolve").then((result) => console.log(result));

fs.readFile("file.txt", "utf-8", (err, data) => {
  setTimeout(() => console.log("Timer inside readfile"), 0);

  process.nextTick(() => console.log("Hello from process.nexttick"));

  setImmediate(() => console.log("execute setImmediate in readfile"));

  console.log("file reading callback");
});

process.nextTick(() => console.log("Hello from process.nexttick last vala"));

console.log("sabse last wala");

const fs = require("fs");

setImmediate(() => console.log("execute setImmediate"));
setTimeout(() => console.log("execute timeout 0 second wala"), 0);

Promise.resolve("resolve").then((result) => console.log(result));

fs.readFile("file.txt", "utf-8", (err, data) => {
  setTimeout(() => console.log("Timer inside readfile"), 0);

  process.nextTick(() => console.log("Hello from process.nexttick"));

  setImmediate(() => console.log("execute setImmediate in readfile"));

  console.log("file reading callback");
});

process.nextTick(() => console.log("Hello from process.nexttick last vala"));

console.log("sabse last wala");


const fs = require("fs");


setTimeout(() => console.log("execute timeout 0 second wala"), 0);

Promise.resolve("resolve").then((result) => console.log(result));

fs.readFile("file.txt", "utf-8", (err, data) => {
  setTimeout(() => console.log("Timer inside readfile"), 0);

  process.nextTick(() => console.log("Hello from process.nexttick"));

});

process.nextTick(() => console.log("Hello from process.nexttick last vala"));

console.log("sabse last wala");

