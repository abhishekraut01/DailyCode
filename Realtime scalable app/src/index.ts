import { WebSocketServer, WebSocket } from 'ws'

const wss = new WebSocketServer({
    port: 9000
})

interface Room {
    sockets: WebSocket[]
}

const rooms: Record<string, Room> = {

}

wss.on("connection", (socket: WebSocket) => {
    socket.on("error", () => {
        console.log("something is wrong")
    })

    socket.on("message", (message) => {
        try {
            const parseData = JSON.parse(message as unknown as string);

            if (!parseData || typeof parseData !== "object") {
                console.log("Connection rejected: data is invalid");
                socket.close(1008, "data is invalid");
                return;
            }

            const { roomId, type } = parseData;

            // Validate roomId
            if (!roomId || typeof roomId !== "string") {
                socket.send(JSON.stringify({ error: "Invalid room ID" }));
                return;
            }

            // Handle join-room type
            if (type === "join-room") {
                if (!rooms[roomId]) {
                    rooms[roomId] = { sockets: [] };
                }

                // Avoid adding the same socket multiple times
                if (!rooms[roomId].sockets.includes(socket)) {
                    rooms[roomId].sockets.push(socket);
                    socket.send(JSON.stringify({ message: `Joined room ${roomId}` }));
                } else {
                    socket.send(JSON.stringify({ message: `Already in room ${roomId}` }));
                }

                console.log(`Socket joined room: ${roomId}`);
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
        console.log("socket is close")
    })
})