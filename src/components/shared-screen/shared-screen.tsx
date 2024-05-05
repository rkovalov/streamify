import { memo } from "react";

export const SharedScreen = memo(
  ({ sharedScreenTrack }: { sharedScreenTrack: MediaStreamTrack }) => {
    return (
      <video
        className="rounded-[12px] h-[calc(100vh-5rem)] object-contain"
        ref={(node) => {
          if (node) node.srcObject = new MediaStream([sharedScreenTrack]);
        }}
        autoPlay
        muted
      />
    );
  }
);
