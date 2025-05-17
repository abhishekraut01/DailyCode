"use client";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-amber-500 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <form className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              className="text-shadow-gray-600 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="text-shadow-gray-600 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="register">
          <span className="text-amber-600 font-semibold cursor-pointer">
            Register
          </span>
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
