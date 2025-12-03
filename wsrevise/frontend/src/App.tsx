import { useEffect, useState } from "react"

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState("")

  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (socket && input.trim().length > 0) {
      socket.send(input)
      setInput("") 
    }
  }

  useEffect(() => {
    const socketConnection = new WebSocket("ws://localhost:3000")

    socketConnection.onopen = () => {
      console.log("connected")
      setSocket(socketConnection)
    }

    socketConnection.onmessage = (event: MessageEvent) => {
      setMessages(prev => [...prev, event.data])
    }

    return ()=>{
      socket?.close()
    }

  }, [socket])

  if (!socket) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSendMessage}>Send</button>

      {messages.map((m, i) => (
        <p key={i}>{m}</p>
      ))}
    </div>
  )
}

export default App
