import { useState } from "react"


function App() {
  const [count, setCount] = useState(0)

  const handleIncrease = ()=>{
    if(count < 20){
      setCount(count+1)
    }
  }

    const handleDecrease = ()=>{
     if(count >0){
      setCount(count-1)
    }
  }
  return (
    <>

    <h1>counter value is {count}</h1>
    <button onClick={handleIncrease}>Increase</button>
    <button onClick={handleDecrease}>Decrease</button>
    </>
  )
}

export default App
