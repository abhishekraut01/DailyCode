import type { FormEvent } from "react";

const Signup = () => {
  function handleSubmit(e:FormEvent) {
    e.preventDefault()
  }
  return (
    <div className="h-screen w-full flex justify-center  items-center bg-red-300">
      <form onSubmit={(e)=>{
        handleSubmit(e)
      }}>
        <div className="flex flex-col  items-center border-2 rounded-md p-10 gap-4 shadow-lg">
            <h1 className="text-2xl">Signup</h1>
          <input
          className="p-3 rounded-md"
            type="text"
            name="Username"
            id="username"
            placeholder="Username"
          />
          <input
           className="p-3 rounded-md"
            type="text"
            name="Username"
            id="username"
            placeholder="Password"
          />
          <button className="bg-pink-500 rounded-md px-4 py-2">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
