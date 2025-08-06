import React from 'react'

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <button
        className="flex items-center gap-3 bg-white hover:bg-gray-100 transition-colors duration-200 shadow-md rounded-lg py-3 px-6 text-lg text-gray-800 font-semibold border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <svg
          className="w-6 h-6"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M44.5 20H24V28.5H36.9C36.1 32.1 32.7 35 28 35C22.5 35 18 30.5 18 25C18 19.5 22.5 15 28 15C30.2 15 32.2 15.8 33.7 17.1L39.1 12.1C36.3 9.7 32.4 8 28 8C17.5 8 9 16.5 9 27C9 37.5 17.5 46 28 46C38.5 46 47 37.5 47 27C47 25.3 46.8 23.7 46.5 22.2L44.5 20Z"
              fill="#4285F4"
            />
            <path
              d="M6.3 14.1L12.1 18.9C13.9 15.7 17.6 13 22 13C24.2 13 26.2 13.8 27.7 15.1L33.1 10.1C30.3 7.7 26.4 6 22 6C13.5 6 6 13.5 6 22C6 23.7 6.2 25.3 6.5 26.8L6.3 14.1Z"
              fill="#34A853"
            />
            <path
              d="M24 44C29.5 44 34.1 41.1 36.9 37.5L31.1 32.7C29.3 34.1 27 35 24 35C19.3 35 15.9 32.1 15.1 28.5H6.5C8.2 36.1 15.2 44 24 44Z"
              fill="#FBBC05"
            />
            <path
              d="M44.5 20H24V28.5H36.9C36.1 32.1 32.7 35 28 35C22.5 35 18 30.5 18 25C18 19.5 22.5 15 28 15C30.2 15 32.2 15.8 33.7 17.1L39.1 12.1C36.3 9.7 32.4 8 28 8C17.5 8 9 16.5 9 27C9 37.5 17.5 46 28 46C38.5 46 47 37.5 47 27C47 25.3 46.8 23.7 46.5 22.2L44.5 20Z"
              fill="#4285F4"
            />
          </g>
        </svg>
        Continue with Google
      </button>
    </div>
  )
}

export default Login