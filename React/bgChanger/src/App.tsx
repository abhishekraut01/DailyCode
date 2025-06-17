import { useState } from "react";

export default function App() {
  const [color, setColor] = useState("black");
  return (
    <div
      className="h-screen w-full"
      style={{
        backgroundColor: color,
      }}
    >
      <div className=" p-2 fixed justify-center flex-wrap bottom-12 flex inset-x-0 px-2 ">
        <div className="flex flex-wrap justify-center bg-cyan-50 px-4 py-2 rounded-md items-center gap-3 shadow-lg bg">
          <button
            onClick={() => {
              setColor("red");
            }}
            className="bg-red-600 rounded-md px-4 py-2"
          >
            Red
          </button>
          <button
            onClick={() => {
              setColor("green");
            }}
            className="bg-green-600 rounded-md px-4 py-2"
          >
            green
          </button>
          <button
            onClick={() => {
              setColor("blue");
            }}
            className="bg-blue-600 rounded-md px-4 py-2"
          >
            blue
          </button>

           <button
            onClick={() => {
              setColor("blue");
            }}
            className="bg-blue-600 rounded-md px-4 py-2"
          >
            blue
          </button>
           <button
            onClick={() => {
              setColor("blue");
            }}
            className="bg-blue-600 rounded-md px-4 py-2"
          >
            blue
          </button>
           <button
            onClick={() => {
              setColor("blue");
            }}
            className="bg-blue-600 rounded-md px-4 py-2"
          >
            blue
          </button>
        </div>
      </div>
    </div>
  );
}
