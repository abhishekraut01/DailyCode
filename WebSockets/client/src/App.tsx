import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [soket , setSoket] = useState()
  const [message , setMessage] = useState('')

  const handleClick =()=>{
    soket.send(message)
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");
    setSoket(ws)
    ws.onmessage = (ev)=>{
      console.log(ev.data)
    }
  }, []);

  return (
    <div>
      <input onChange={(e)=>{
        setMessage(e.target.value)
      }} type="text" placeholder="Enter text" />
      <button onClick={handleClick}>Send MSG</button>
    </div>
  );
}

export default App;
