import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import { useAuth } from "../context/AuthContext"

function AppRoutes() {
    const {user} = useAuth()
  return (
    <Routes>
        <Route index element={user ? <Home/> : <Login/>}></Route>
        <Route path="/profile" element={user ? <Profile/> : <Login/>}></Route>
        <Route path="/login" element={user ? <Home/> : <Login/>}></Route>
        <Route path="/signup" element={user ? <Home/> : <Signup/>}></Route>
    </Routes>
  )
}

export default AppRoutes