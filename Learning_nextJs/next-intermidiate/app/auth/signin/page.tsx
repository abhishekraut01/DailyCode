import Link from "next/link";

const Signin = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-amber-200">
      <div className="bg-white text-black rounded-md border border-none shadow-2xl flex flex-col p-5 justify-center items-center ">
        <h1>Sign In</h1>
        <form className="flex flex-col p-4 border-amber-200 border">
          <label>Username</label>
          <input
            className="border border-none p-3 shadow-2xl rounded-md text-gray-500"
            type="text"
            placeholder="User75"
          />
          <label>password</label>
          <input
            className="border border-none p-3 shadow-2xl rounded-md text-gray-500"
            type="text"
            placeholder="Password"
          />

          <Link href={"/"}>
            <button className="bg-amber-400 rounded-md px-1 py-2">
              Sign In
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signin;
