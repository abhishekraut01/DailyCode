import { WebSocket } from "ws";

const handleLeaveRoom = (socket: WebSocket, userId: string , data: any) => {
    // Implement the logic for a user joining a room
    const roomId = data.roomId;
    console.log(`User ${userId} is attempting to join room ${roomId}`);
    // Here you would add the user to the room, notify other users, etc.
    socket.send(JSON.stringify({ type: "join-room-ack", roomId, status: "joined" }));
};

export default handleLeaveRoom;