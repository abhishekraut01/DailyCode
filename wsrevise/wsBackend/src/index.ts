import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();

// Create a raw HTTP server
const server = http.createServer(app);

// Attach WSS to raw HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (data) => {
    console.log("Received:", data.toString());

    // Echo back
    socket.send(data.toString());
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start server
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
