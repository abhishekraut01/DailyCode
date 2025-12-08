import { WebSocketServer, WebSocket } from 'ws'
import checkAuth from './utils/checkAuth.js';
import handleJoinRoom from './services/joinRoomService.js';
import handleChat from './services/chatRoomService.js';
import handleLeaveRoom from './services/leaveRoomService.js';
import { safeSend } from './utils/safeSend.js';

const PORT = process.env.PORT || "8002"

const wss = new WebSocketServer({ port: Number(PORT) })

wss.on("connection", (socket: WebSocket, req) => {
    try {
        const userId = checkAuth(socket, req)

        if (!userId) {
            socket.close(1008, "Unauthorized");
            return;
        }

        socket.on("message", (messageData) => {
            const parsedData = JSON.parse(messageData.toString())

            switch (parsedData.type) {
                case "join-room":
                    handleJoinRoom(socket, userId, parsedData);
                    break;
                case "chat":
                    handleChat(socket, userId, parsedData);
                    break;
                case "leave-room":
                    handleLeaveRoom(socket, userId, parsedData);
                    break;
                default:
                    safeSend(socket, { type: "error", message: "Unknown message type" });
            }
        })


    } catch (err) {
        console.error("WS parse error:", err);
        socket.close(1011, "Internal server error");
    }
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`)