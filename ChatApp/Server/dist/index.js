"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({
    port: 8000,
});
const users = [];
wss.on("connection", (soket) => {
    soket.on("message", (message) => {
        const parseMessage = JSON.parse(message.toString());
        if (parseMessage.type == "join") {
            users.push({
                soket: soket,
                roomId: parseMessage.roomId,
            });
            soket.send("you are joined in room");
        }
        if (parseMessage.type == "chat") {
            let currentUserRoomId = null;
            for (let i = 0; i < users.length; i++) {
                if (users[i].soket == soket) {
                    currentUserRoomId = users[i].roomId;
                }
            }
            for (let i = 0; i < users.length; i++) {
                if (users[i].roomId == currentUserRoomId) {
                    users[i].soket.send(`Message from server ${parseMessage.message}`);
                }
            }
        }
    });
});
