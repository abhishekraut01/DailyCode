import { WebSocketServer, WebSocket } from "ws";

const ws = new WebSocketServer({
  port: 8001,
});

let userCount = 0;
let allSokets: WebSocket[] = [];

ws.on("connection", (soket) => {
  allSokets.push(soket);
  console.log(`user Connected #${userCount}`);

  soket.on("message", (message) => {
    for(let i=0; i<allSokets.length ; i++){
        let user = allSokets[i]
        user.send( `this message is from ${allSokets[i].url} ${message.toString()}`)
    }
  });

});
