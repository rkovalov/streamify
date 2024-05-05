// import Image from "next/image";
// import { useUser } from "@auth0/nextjs-auth0/client";
"use client";
import { useState, useEffect } from "react";
import { useMediaStream } from "@/hooks";
// import { getUserProfileData } from "@/services/profile.service";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Lobby, LoaderError, Room } from "@/components";

const FAILURE_MSG =
  "Ooops!!! Couldn't create stream for you. Try again later 🫠";
const LOADER_STREAM_MSG = "Hold on. Getting your video stream ready... 🚀";

export default function RoomPage({ params }: { params: { roomId: string } }) {
  // const user = useUser();
  // const user = await getUserProfileData();

  useEffect(() => {
    console.log("[ROOM PAGE]: mount");
    return () => {
      console.log("[ROOM PAGE]: unmount");
    };
  }, []);

  const [isLobby, setIsLobby] = useState(true);
  const { stream, isLoading } = useMediaStream();

  if (isLoading) return <LoaderError msg={LOADER_STREAM_MSG} />;
  if (!stream) return <LoaderError msg={FAILURE_MSG} />;

  if (isLobby)
    return <Lobby stream={stream} onJoinRoom={() => setIsLobby(false)} />;

  return <Room stream={stream} />;
}

// export default withPageAuthRequired(RoomPage as any, {
//   returnTo: (params: any) => `/rooms/${params.roomId}`,
// });
