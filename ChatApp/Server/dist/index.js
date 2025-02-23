"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const ws = new ws_1.WebSocketServer({
    port: 8001,
});
let userCount = 0;
let allSokets = [];
ws.on("connection", (soket) => {
    allSokets.push(soket);
    console.log(`user Connected #${userCount}`);
    soket.on("message", (message) => {
        for (let i = 0; i < allSokets.length; i++) {
            let user = allSokets[i];
            user.send(`this message is from ${allSokets[i].url} ${message.toString()}`);
        }
    });
});
