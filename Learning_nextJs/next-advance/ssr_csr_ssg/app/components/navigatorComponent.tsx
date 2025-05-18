"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function BlogNavigator() {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/blogs/${id}`);
  };

  return (
    <div>
      <button
        className="bg-amber-300 px-4 py-2 rounded-md"
        onClick={() => handleClick(1)}
      >
        Blog 1
      </button>
      <button
        className="bg-amber-300 px-4 py-2 rounded-md"
        onClick={() => handleClick(2)}
      >
        Blog 2
      </button>
      <button
        className="bg-amber-300 px-4 py-2 rounded-md hover:scale-y-50 hover:bg-amber-600 cursor-pointer"
        onClick={() => handleClick(3)}
      >
        Blog 3
      </button>
    </div>
  );
}
