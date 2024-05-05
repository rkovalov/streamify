import { useContext, useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import { UserMessage } from "@/types";
import { append, formatTimeHHMM } from "@/utils";

import { SocketContext } from "@/contexts/socket";
import { Message } from "../message";

export const Chat = () => {
  const username = useUser().user!.name;
  const socket = useContext(SocketContext);

  const [text, setText] = useState("");
  const [messages, setMessages] = useState<UserMessage[]>([]);

  useEffect(() => {
    socket.on("chat:get", (message: UserMessage) =>
      setMessages(append(message))
    );

    return () => {
      socket.off("chat:get");
    };
  }, []);

  function sendMessage(e: React.KeyboardEvent<HTMLInputElement>) {
    const messageText = (e.target as HTMLInputElement).value;
    const lastMessage = messages.at(-1);

    if (e.key === "Enter" && messageText) {
      const timeHHMM = formatTimeHHMM(Date.now());
      const message = {
        user: username,
        text: messageText,
        time: timeHHMM,
        shouldAggregate:
          lastMessage?.user === "You" && lastMessage?.time === timeHHMM,
      };

      socket.emit("chat:post", message);
      setMessages(append({ ...message, user: "You" }));
      setText("");
    }
  }

  return (
    <>
      <div className="overflow-y-auto h-[calc(100vh-10rem)]">
        {messages.map((message, index) => (
          <Message
            key={`${message.time}-${index}`}
            message={message}
            isLast={index === messages.length - 1}
          />
        ))}
      </div>
      <div className="flex items-center justify-center pr-6 pt-6">
        <input
          autoComplete="off"
          type="text"
          name="name"
          id="name"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={sendMessage}
          className="p-4 bg-transparent outline-none block w-full text-sm border border-gray-300/[.5] rounded-2xl"
          placeholder="Send a message to everyone"
        />
      </div>
    </>
  );
};
