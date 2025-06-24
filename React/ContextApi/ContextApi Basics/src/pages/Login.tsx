import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const dummydata = {
      username,
      password,
    };

    setUser(dummydata);
    localStorage.setItem("user", JSON.stringify(dummydata));
    navigate("/"); // ✅ Optional: redirect after login
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-100 to-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <div className="flex flex-col gap-4">
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-md transition-all duration-200"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
