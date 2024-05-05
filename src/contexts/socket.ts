import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("/", { path: "/api/socketio" });
export const SocketContext = createContext(socket);
