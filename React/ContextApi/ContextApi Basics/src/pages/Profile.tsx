import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-green-200">
      <h1 className="text-3xl font-bold">Welcome {user.username} 👋</h1>
      <p className="text-lg">Email: {user.email}</p>
    </div>
  );
};

export default Profile;
