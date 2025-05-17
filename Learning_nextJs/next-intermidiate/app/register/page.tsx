import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-b from-yellow-400 to-yellow-600 ">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Sign Up
        </h1>
        <form className="space-y-5">
          <label className="block mb-1 text-sm font-semibold text-gray-600">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className="text-shadow-gray-600 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <label className="block mb-1 text-sm font-semibold text-gray-600">
            Password
          </label>
          <input
            type="text"
            placeholder="Password"
            className="text-shadow-gray-800 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2  focus:ring-amber-400 "
          />
          <Link href={"/login"}>
            <button className="border-none bg-amber-400 w-full rounded-md px-4 py-2">
              Sign Up
            </button>
          </Link>
        </form>
        <p className="text-center text-sm text-gray-600">
          Have an account?{" "}
          <Link href="/login">
            <span className="text-amber-600 font-semibold cursor-pointer">
              login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
