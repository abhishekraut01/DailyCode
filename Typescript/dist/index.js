"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({
    port: 8000,
});
wss.on("connection", (soket) => {
    console.log("user connected");
    setInterval(() => {
        soket.send("Solana prize ki toh amma bahen ho gayi yaar " + Math.random() * 10);
    }, 500);
    soket.on('message', (e) => {
        console.log(e.toString());
    });
});
