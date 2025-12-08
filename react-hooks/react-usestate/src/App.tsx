import { useState } from "react"

export default function App() {
  const [count, setCount] = useState(0)

  function handleIncrement() {
    setCount((prev) => prev + 1)
  }

  return (
    <div>
      <p>counter :{count}</p>
      <button onClick={handleIncrement}> Increment</button>
    </div>
  )
}