import { WebSocket } from "ws";

export const safeSend = (socket: WebSocket, data: any): void => {
  try {
    // 1. Check socket open state
    if (socket.readyState !== WebSocket.OPEN) {
      console.warn("Attempted to send message on a closed socket");
      return;
    }

    // 2. Convert to JSON safely
    const payload =
      typeof data === "string" ? data : JSON.stringify(data);

    // 3. Actually send
    socket.send(payload, (err) => {
      if (err) {
        console.error("WS send error:", err);
      }
    });
  } catch (err) {
    console.error("WS safeSend error:", err);
  }
};
