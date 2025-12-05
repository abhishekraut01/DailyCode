import { WebSocketServer, WebSocket } from 'ws'
const PORT = process.env.PORT || "8002"

const wss = new WebSocketServer({ port: Number(PORT) })

wss.on("connection", (socket) => {
    console.log("Client connected");

    socket.send("Welcome to room");

    socket.on("message", (msg) => {
        console.log("Client says:", msg.toString());
    });

    socket.on("close", () => {
        console.log("Client disconnected");
    });
});
