import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({
    port: 9000
})

interface room {
    sockets: WebSocket[]
}

wss.on("connection", (socket) => {
    socket.on("error", () => {
        console.log("something is wrong")
    })

    socket.on("message", (message) => {
        try {
            const parseData = JSON.parse(message as unknown as string)

            if (!parseData) {
                console.log("Connection rejected: No token provided");
                socket.close(1008, "data is invalid");
                return;
            }


        } catch (error) {

        }
    })


    socket.on("close", () => {
        console.log("socket is close")
    })
})