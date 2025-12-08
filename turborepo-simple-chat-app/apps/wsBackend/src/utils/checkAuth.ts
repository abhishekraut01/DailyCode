import { WebSocket } from "ws";
import { IncomingMessage } from "http";
import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

const checkAuth = (socket: WebSocket, req: IncomingMessage): string | null => {
    try {
        if (!req.url) {
            socket.close(1008, "Malformed request");
            return null;
        }

        const host = req.headers.host || "localhost";
        const url = new URL(req.url, `http://${host}`);

        const token = url.searchParams.get("token");
        if (!token) {
            socket.close(1008, "Missing token");
            return null;
        }

        const decoded = jwt.verify(token, JWT_ACCESS_SECRET);
        if (!decoded || !decoded.sub) {
            socket.close(1008, "Invalid token");
            return null;
        }

        return decoded.sub.toString();

    } catch (err) {
        console.error("WS parse error:", err);
        socket.close(1011, "Internal server error");
        return null;
    }
}

export default checkAuth;
