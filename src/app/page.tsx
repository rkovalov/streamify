// import Image from "next/image";
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

import { Header } from "@/components";
import { createRoomId, createHost } from "@/utils";
import { toast } from "react-toastify";

if (typeof window !== "undefined") {
  // @ts-ignore
  window.toast = toast;
}

import "react-toastify/dist/ReactToastify.css";

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
    <main className="flex gap-10 items-center min-h-screen bg-background-primary p-8 sm:px-24 flex-col md:flex-row">
      {/* {user.isLoading ? "Loading..." : <Header />} */}
      <div className="h-full flex content-between flex-1 flex-col px-4 sm:px-8 md:px-12 lg:px-20 xl:px-38">
        {/* <div className="sm:text-center lg:text-left"> */}
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 md:text-6xl">
          <span className="block text-gray-200 xl:inline">Video calls.</span>{" "}
          <span className="block text-emerald-500 xl:inline">
            Now "expensive" for everyone.
          </span>
        </h1>
        <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          For secure business and friendly meetings.
        </p>
        <div className="flex conetent-center gap-4 justify-start mt-4 flex-col sm:flex-row">
          <div>
            <button
              onClick={createRoom}
              className="p-3 bg-emerald-300 hover:bg-indigo-200 rounded-md text-emerald-800 text-sm founded-medium"
            >
              Create
            </button>
          </div>

          <span className="flex items-center">or</span>
          <div className="flex gap-4">
            <input
              onChange={(e: any) => setRoomId(e.target.value)}
              placeholder="Enter room id"
              className="flex-1 px-4 py-1 rounded-md text-emerald-800"
            />

            <button
              onClick={joinRoom}
              disabled={roomId.length == 0}
              className="p-3 bg-emerald-500 hover:bg-indigo-300 rounded-md text-emerald-800 text-sm founded-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Join
            </button>
          </div>

          {/* </div> */}
        </div>
      </div>
      <div className="flex-1 h-1/5 sm:h-1/3 lg:h-full lg:w-1/2 relative">
        <Image
          src="/hero.webp"
          width="600"
          height="600"
          // className="w-6/10"
          alt="hero"
        />
      </div>
    </main>
  );
}
