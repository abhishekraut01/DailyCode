import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  function handleSignup(e: FormEvent) {
    e.preventDefault();

    const newUser = {
      username,
      email,
      password,
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/"); // Or navigate("/home") if home route exists
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-white">
      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-lg shadow-xl w-full max-w-sm"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>

        <div className="flex flex-col gap-4">
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <button
            type="submit"
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-md transition-all duration-200"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
