import type { FormEvent } from "react";

const Login = () => {
  function handleSubmit(e:FormEvent) {
    e.preventDefault()
  }
  return (
    <div className="h-screen w-full flex justify-center items-center bg-red-300">
      <form onSubmit={(e)=>{
        handleSubmit(e)
      }}>
        <div className="flex flex-col">
          <input
            type="text"
            name="Username"
            id="username"
            placeholder="Username"
          />
          <input
            type="text"
            name="Username"
            id="username"
            placeholder="Password"
          />
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
