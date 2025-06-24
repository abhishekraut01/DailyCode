import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user"); // 🔧 fixed casing (was "User")
    navigate("/login");
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-purple-200 to-pink-100 px-6">
      <div className="bg-white shadow-xl rounded-lg p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome, {user?.username}! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          You're successfully logged in.
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
