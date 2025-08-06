"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <header className="flex justify-end gap-4">
        {session ? (
          <>
            <button
              onClick={() => signOut()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signIn()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Sign In
            </button>
          </>
        )}
      </header>
      
      {session ? (
        <>
          <h1>Home Page</h1>
          <p>{session?.user?.email}</p>
        </>
      ) : (
        <>
          <p>Please sign in to continue</p>
        </>
      )}
    </div>
  );
}
