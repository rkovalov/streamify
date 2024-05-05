"use client";
import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("/", { path: "/api/socketio" });

console.log("!!!!!!!!!!!!!", { socket });
export const SocketContext = createContext(socket);
