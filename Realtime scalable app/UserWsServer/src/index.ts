import { WebSocketServer, WebSocket } from 'ws';

export const wss = new WebSocketServer({ port: 9000 });

interface Room {
    sockets: WebSocket[];
}

export const rooms = new Map<string, Room>();

wss.on("connection", (socket: WebSocket) => {
    socket.on("error", () => {
        console.log("something is wrong")
    })

    socket.on("message", (message) => {
        try {
            const parseData = JSON.parse(message as unknown as string);

            if (!parseData || typeof parseData !== "object") {
                console.log("Connection rejected: data is invalid");
                socket.send(JSON.stringify({ error: "Invalid message format" }));
                return;
            }

            const { roomId, type } = parseData;

            if (!roomId || typeof roomId !== "string") {
                socket.send(JSON.stringify({ error: "Invalid room ID" }));
                return;
            }

            if (type === "join-room") {
                if (!rooms.has(roomId)) {
                    rooms.set(roomId, { sockets: [] });
                }

                const room = rooms.get(roomId)!;

                if (!room.sockets.includes(socket)) {
                    room.sockets.push(socket);
                    socket.send(JSON.stringify({ message: `Joined room ${roomId}` }));
                } else {
                    socket.send(JSON.stringify({ message: `Already in room ${roomId}` }));
                }

                console.log(`Socket joined room: ${roomId}`);
            }

            if (type === "chat") {
                const { message: chatMessage } = parseData;

                if (!chatMessage || typeof chatMessage !== "string") {
                    socket.send(JSON.stringify({ error: "Invalid chat message" }));
                    return;
                }

                const room = rooms.get(roomId);

                if (!room) {
                    socket.send(JSON.stringify({ error: "Room not found. Join a room first." }));
                    return;
                }

                const payload = JSON.stringify({ type: "chat", roomId, message: chatMessage });

                for (const peer of room.sockets) {
                    if (peer !== socket && peer.readyState === WebSocket.OPEN) {
                        peer.send(payload);
                    }
                }
            }

        } catch (error) {
            console.error("Error parsing message:", error);
            try {
                socket.send(JSON.stringify({ error: "Invalid message format" }));
            } catch (err) {
                console.error("Error sending error message:", err);
            }
        }
    });

    socket.on("close", () => {
        console.log("socket is closed");

        for (const [roomId, room] of rooms) {
            const index = room.sockets.indexOf(socket);
            if (index !== -1) {
                room.sockets.splice(index, 1);
                console.log(`Socket removed from room: ${roomId}`);

                if (room.sockets.length === 0) {
                    rooms.delete(roomId);
                    console.log(`Room deleted (empty): ${roomId}`);
                }
            }
        }
    })
})
