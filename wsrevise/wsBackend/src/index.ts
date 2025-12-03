import express from 'express'
import {WebSocketServer} from "ws"

const app = express()
const httpServer = app.listen(3000 )
const wss = new WebSocketServer({server:httpServer})

wss.on("connection" , (socket)=>{
    socket.on("message" , (data)=>{
        console.log("recieved %s" , data)
    })
})