import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import Login from "../pages/Login"
import Signup from "../pages/Signup"

function AppRoutes() {
  return (
    <Routes>
        <Route index element={<Home/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
    </Routes>
  )
}

export default AppRoutes