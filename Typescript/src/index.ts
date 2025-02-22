import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
  port: 8000,
});

wss.on("connection", (soket) => {
  console.log("user connected");
  setInterval(() => {
    soket.send("Solana prize ki toh amma bahen ho gayi yaar " + Math.random()*10);
  }, 500);

  soket.on('message',(e)=>{
    console.log(e.toString())
  })
});
