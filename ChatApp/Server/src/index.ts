import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000 });

interface IUser {
  roomId: string;
  socket: WebSocket;
}

const users: IUser[] = [];

wss.on("connection", (socket) => {
  
  socket.on("message", (rawMessage) => {
    const parsed = JSON.parse(rawMessage.toString());

    // ----------- Join Room -----------
    if (parsed.type === "join") {
      users.push({
        roomId: parsed.roomId,
        socket: socket
      });

      socket.send(
        JSON.stringify({
          type: "system",
          data: `You joined room ${parsed.roomId}`
        })
      );
    }

    // ----------- Chat Message -----------
    if (parsed.type === "chat") {
      const { text } = parsed;

      const user = users.find((u) => u.socket === socket);
      if (!user) return;

      const senderRoomId = user.roomId;

      users.forEach((client) => {
        if (client.roomId === senderRoomId && client.socket !== socket) {

          client.socket.send(
            JSON.stringify({
              type: "chat",
              data: text
            })
          );
        }
      });

    }
  });

  // ----------- Cleanup On Disconnect -----------
  socket.on("close", () => {
    const index = users.findIndex((u) => u.socket === socket);
    if (index !== -1) users.splice(index, 1);
  });
});
