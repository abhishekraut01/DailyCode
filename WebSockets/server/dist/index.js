"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8000 });
wss.on("connection", (socket) => {
    console.log("Client connected on port 8000");
    socket.on("message", (message) => {
        const msg = message.toString().trim().toLowerCase(); // Convert Buffer to String safely
        if (msg === "ping") {
            socket.send("pong");
        }
    });
    socket.on("close", () => {
        console.log("Client disconnected");
    });
});
