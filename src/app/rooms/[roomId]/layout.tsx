// import { createContext } from "react";
// import { io } from "socket.io-client";
"use client";
import { SocketContext, socket } from "@/contexts/socket";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SocketContext.Provider value={socket}>
      <main className="flex min-h-screen flex-col items-center justify-between bg-background-primary">
        {children}
      </main>
    </SocketContext.Provider>
  );
}
