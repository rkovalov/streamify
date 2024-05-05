import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { KeyValue, Nullable, PeerId, RoomId } from "@/types";
import { append, isHost } from "@/utils";

import { SocketContext } from "./socket";

export const UsersUpdaterContext = createContext<any>({});
export const UsersStateContext = createContext<any>({});

export function UsersSettingsProvider({ children }: any) {
  const params = useParams();

  const socket = useContext(SocketContext);

  const [streams, setStreams] = useState<Record<PeerId, JSX.Element>>({});

  const [isMuted, setIsMuted] = useState<KeyValue<boolean>>({});
  const [isHidden, setIsHidden] = useState<KeyValue<boolean>>({});
  const [avatars, setAvatars] = useState<KeyValue<string>>({});
  const [names, setNames] = useState<KeyValue<string>>({});

  const [sharedScreenTrack, setSharedScreenTrack] =
    useState<Nullable<MediaStreamTrack>>(null);

  useEffect(() => {
    socket.on("user:toggled-video", (peerId: PeerId) =>
      setIsHidden(append({ [peerId]: !isHidden[peerId] }))
    );
  }, [isHidden]);

  useEffect(() => {
    socket.on("user:toggled-audio", (peerId: PeerId) =>
      setIsMuted(append({ [peerId]: !isMuted[peerId] }))
    );
  }, [isMuted]);

  return (
    <UsersStateContext.Provider
      value={{
        streams,
        isMuted,
        isHidden,
        isHost: isHost(params?.roomId as RoomId),
        avatars,
        names,
        sharedScreenTrack,
      }}
    >
      <UsersUpdaterContext.Provider
        value={{
          setIsMuted,
          setIsHidden,
          setAvatars,
          setStreams,
          setNames,
          setSharedScreenTrack,
          muteUser: (id: PeerId) => socket.emit("host:mute-user", id),
        }}
      >
        {children}
      </UsersUpdaterContext.Provider>
    </UsersStateContext.Provider>
  );
}
