// import { createContext } from "react";
// import { io } from "socket.io-client";
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { SocketContext, socket } from "@/contexts/socket";

// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  useEffect(() => {
    console.log("[ROOM LAYOUT PAGE]: mount");
    return () => {
      console.log("[ROOM LAYOUT PAGE]: unmount");
    };
  }, []);

  function back() {
    router.push("/");
  }

  return (
    <SocketContext.Provider value={socket}>
      <main className="relative flex min-h-screen flex-col items-center justify-between bg-background-primary">
        <div>
          <ArrowUturnLeftIcon
            className="absolute w-10 h-10 text-white left-10 top-10 cursor-pointer"
            onClick={back}
          />
        </div>
        {children}
      </main>
    </SocketContext.Provider>
  );
}
