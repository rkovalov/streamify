import { useContext } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

import { UsersConnectionContext } from "@/contexts/users-connection";

import { VideoContainer } from "../video-container";
import { VideoPeer } from "../video-peer";

export function MyStream({
  stream,
  muted,
  visible,
}: {
  stream: MediaStream;
  muted: boolean;
  visible: boolean;
}) {
  const avatar = useUser().user!.picture || "";
  const { myId } = useContext(UsersConnectionContext);

  return (
    <VideoContainer
      id={myId}
      muted={muted}
      visible={visible}
      stream={stream}
      userPicture={avatar}
    >
      <VideoPeer stream={stream} name="You" isMe={true} />
    </VideoContainer>
  );
}
