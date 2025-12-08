import { useState } from "react"

interface IUser {
  login: string
  id: string
  node_id: string
  avatar_url: string
}

export default function App() {

  const [users, setUsers] = useState<IUser[]>()

  const fetchUsers = async () => {
    const response = await fetch('https://api.github.com/users')
    const data = await response.json()
    setUsers(data)
  }
  fetchUsers()

  if (!users) return <div>Loading.......</div>
  console.log(users)

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      backgroundColor: "blueviolet",
      padding: "20px"
    }}>
      <p>Premium Users</p>
      {
        users.map((user) => {
          return <img src={user.avatar_url} height={100} width={100} />
        })
      }
    </div>
  )
}