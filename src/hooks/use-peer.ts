import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useUser } from "@auth0/nextjs-auth0/client";
import { useMediaStream } from "./use-media-stream";
import { SocketContext } from "@/contexts/socket";

import Peer from "peerjs";

import { Nullable, PeerId } from "@/types";
import { error } from "@/utils";

/**
 * Creates a peer and joins them into the room
 * @returns peer object, its id and meta-state whether is peer fully created
 */
export const usePeer = (stream: MediaStream) => {
  const socket = useContext(SocketContext);
  const params = useParams<{ roomId: string }>();

  const user = useUser().user!;

  const { muted, visible } = useMediaStream(stream);

  const [isLoading, setIsLoading] = useState(true);
  const [peer, setPeer] = useState<Nullable<Peer>>(null);
  const [myId, setMyId] = useState<PeerId>("");

  useEffect(() => {
    (async function createPeerAndJoinRoom() {
      try {
        const peer = new (await import("peerjs")).default();
        console.log({ peer, socket });
        setPeer(peer);
        setIsLoading(false);

        peer.on("open", (id) => {
          console.log(`[Peer]: your device id: ${id}`);
          setMyId(id);
          socket.emit("room:join", {
            room: params?.roomId,
            user: {
              id,
              muted,
              visible,
              name: user.name,
              picture: user.picture,
            },
          });
        });

        peer.on("error", error("[Peer]: Failed to setup peer connection"));
      } catch (e) {
        error("[Peer]: Unable to create peer")(e);
      }
    })();
  }, []);

  return {
    peer,
    myId,
    isPeerReady: !isLoading,
  };
};
