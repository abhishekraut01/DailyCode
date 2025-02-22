"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({
    port: 8000
});
wss.on('connection', (socket) => {
    console.log("Server is started on port 8000");
    socket.on('message', (event) => {
        if (event.toString().toLocaleLowerCase() === "ping") {
            socket.send("pong");
        }
    });
});
