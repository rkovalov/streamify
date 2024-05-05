// import Image from "next/image";
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

import { Header } from "@/components";
import { createRoomId, createHost } from "@/utils";

// import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const user = useUser();
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  function createRoom() {
    const newRoomId = createRoomId();
    createHost(newRoomId);
    router.push(`/rooms/${newRoomId}`);
  }

  function joinRoom() {
    router.push(`/rooms/${roomId}`);
  }

  return (
    <main className="flex min-h-screen flex-col bg-background-primary">
      {user.isLoading ? "Loading..." : <Header />}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-3xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block text-gray-200 xl:inline">
                    Video calls.
                  </span>{" "}
                  <span className="block text-emerald-500 xl:inline">
                    Now "expensive" for everyone.
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  For secure business and friendly meetings.
                </p>
                <div className="flex gap-4 justify-start mt-4">
                  <button
                    onClick={createRoom}
                    className="p-3 bg-emerald-300 hover:bg-indigo-200 rounded-md text-emerald-800 text-sm founded-medium"
                  >
                    Create New Room
                  </button>

                  <input
                    onChange={(e: any) => setRoomId(e.target.value)}
                    placeholder="Enter or paste room id"
                    className="px-4 py-1 w-80 rounded-md text-emerald-800"
                  />

                  <button
                    onClick={joinRoom}
                    disabled={roomId.length == 0}
                    className="p-3 bg-emerald-500 hover:bg-indigo-300 rounded-md text-emerald-800 text-sm founded-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Join
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </main>
  );
}
