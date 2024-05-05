// import { createContext } from "react";
// import { io } from "socket.io-client";
"use client";
import { useEffect } from "react";
import { SocketContext, socket } from "@/contexts/socket";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    console.log("[ROOM LAYOUT PAGE]: mount");
    return () => {
      console.log("[ROOM LAYOUT PAGE]: unmount");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <main className="flex min-h-screen flex-col items-center justify-between bg-background-primary">
        {children}
      </main>
    </SocketContext.Provider>
  );
}
