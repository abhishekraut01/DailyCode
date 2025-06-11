"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

const Signup = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");

  return (
    <div className="flex justify-center items-center w-full h-screen bg-amber-200">
      <div className="bg-white text-black rounded-md border border-none shadow-2xl flex flex-col p-5 justify-center items-center ">
        <h1>Sign Up</h1>
        <form className="flex flex-col p-4 border-amber-200 border items-center">
         
          <input
            className="border border-none p-3 shadow-2xl rounded-md text-gray-500 mt-2"
            type="text"
            placeholder="User75"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
       
          <input
            className="border border-none p-3 shadow-2xl rounded-md text-gray-500 mt-2"
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Link href={"/auth/signin"}>
            <button
              className="bg-amber-400 rounded-md px-1 py-2 flex justify-center items-center mt-2"
              onClick={() => {
                console.log(Username);
                console.log(Password);
                axios.post("http://localhost:3000/api/v1/auth", {
                  Username,
                  Password,
                });
              }}
            >
              Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
