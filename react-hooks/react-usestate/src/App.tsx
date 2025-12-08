import { useEffect, useState } from "react"
import "./App.css"

interface IUser {
  login: string
  id: string
  node_id: string
  avatar_url: string
}

const DEFAULT_PER_PAGE = "30"

export default function App() {
  const [users, setUsers] = useState<IUser[]>([])
  const [userInput, setUserInput] = useState(DEFAULT_PER_PAGE)

  // Reusable fetch function
  const fetchUsers = async (perPage: string) => {
    try {
      const response = await fetch(
        `https://api.github.com/users?per_page=${perPage}`
      )

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data = await response.json()
      setUsers(data)
    } catch (err) {
      console.error(err)
      setUsers([]) // or handle error state separately
    }
  }

  useEffect(() => {
    fetchUsers(DEFAULT_PER_PAGE)
  }, [])

  const handleFetchUserOnClick = () => {
    fetchUsers(userInput)
  }

  if (users.length === 0) return <div>Loading.......</div>

  return (
    <div className="app-container">
      <div className="card">
        <div className="header">
          <div>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              type="text"
            />
            <button onClick={handleFetchUserOnClick}>Get Users</button>
          </div>

          <span>{users.length} profiles fetched from GitHub</span>
        </div>

        <div className="users-grid">
          {users.map((user) => (
            <div className="user-card" key={user.id}>
              <img src={user.avatar_url} alt={user.login} />
              <span>{user.login}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
