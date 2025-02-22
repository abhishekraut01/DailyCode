import { useEffect, useState } from 'react'
import './App.css'

function App() {

  const [soket , setSoket] = useState<T>()
  const [messageValue , setMessageValue] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setMessageValue(e.target.value)
  }

  function sendMessage(){
    if(!soket){
      return;
    } 
    soket.send(messageValue)
  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000')
    setSoket(ws)
    ws.onmessage = (ev)=>{
      alert(ev.data)
    }
  }, [])
  

  return (
    <div>
      <input onChange={(e)=>{
        handleChange(e)
      }} type="text" placeholder='Enter text' />
      <button onClick={()=>{
        sendMessage()
      }}>Send MSG</button>
    </div>
  )
}

export default App