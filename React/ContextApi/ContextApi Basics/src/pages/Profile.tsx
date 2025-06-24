import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 px-4">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">
          Hello, {user?.username} 👋
        </h1>
        <p className="text-gray-700 text-lg">
          <span className="font-medium">Email:</span> {user?.email}
        </p>

        <div className="mt-6 text-sm text-gray-500">
          This is your profile info saved in context.
        </div>
      </div>
    </div>
  );
};

export default Profile;
