import { WebSocketServer, WebSocket } from 'ws'
import jwt from 'jsonwebtoken'
const PORT = process.env.PORT || "8002"
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!


const wss = new WebSocketServer({ port: Number(PORT) })

wss.on("connection", (socket, req) => {
    try {
        if (!req.url) {
            socket.close(1008, "Malformed request");
            return;
        }

        const host = req.headers.host || "localhost";
        const url = new URL(req.url, `http://${host}`);

        const token = url.searchParams.get("token");

        if (!token) {
            socket.close(1008, "Missing token");
            return;
        }

        const decoded = jwt.verify(token, JWT_ACCESS_SECRET)

        if (!decoded || decoded.sub) {
            socket.close(1008, "JWT_ACCESS_SECRET is missing");
            return;
        }

        // Continue handshake...
    } catch (err) {
        console.error("WS parse error:", err);
        socket.close(1011, "Internal server error");
    }
});

console.log(`WebSocket server is running on ws://localhost:${PORT}`)