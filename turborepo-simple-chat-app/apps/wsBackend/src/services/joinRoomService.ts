import { WebSocket } from "ws";

const handleJoinRoom = (socket: WebSocket, userId: string , data: any) => {
    const roomId = data.roomId;
    
};

export default handleJoinRoom;