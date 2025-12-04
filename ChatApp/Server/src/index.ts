import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8000 })

interface IUser {
  roomId: string,
  socket: WebSocket
}

const users: IUser[] = []

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsedData = JSON.parse(message.toString())

    if (parsedData.type === "join") {
      users.push({
        roomId: parsedData.roomId,
        socket: socket
      })
      socket.send("You joined room " + parsedData.roomId)
    }

    if (parsedData.type === "chat") {
      const { message } = parsedData

      const user = users.find((u) => u.socket === socket)
      if (!user) return

      const senderRoomId = user.roomId

      users.forEach((client) => {
        if (client.roomId === senderRoomId && client.socket !== socket) {
          client.socket.send("message", message)
        }
      })
    }

  })

  socket.on("close", () => {
    const index = users.findIndex((u) => u.socket === socket)
    if (index !== -1) users.splice(index, 1)
  })
})