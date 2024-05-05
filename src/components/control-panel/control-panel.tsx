import { useContext } from "react";
import { Tooltip } from "react-tooltip";

import {
  ChatBubbleBottomCenterIcon as ChatIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import {
  VideoCameraIcon,
  MicrophoneIcon,
  PhoneXMarkIcon as HangUpIcon,
  ArrowUpTrayIcon as ShareScreenIcon,
} from "@heroicons/react/24/solid";

import { UsersConnectionContext } from "@/contexts/users-connection";
import { UsersStateContext } from "@/contexts/users-settings";

import { CrossLine } from "@/components/cross-line";

export const ControlPanel = ({
  muted,
  visible,
  chat,
  status,
  screenTrack,
  screen,
  onToggle,
  onLeave,
}: any) => {
  const { sharedScreenTrack: shared, streams } = useContext(UsersStateContext);
  const { users } = useContext(UsersConnectionContext);

  return (
    <>
      {(screenTrack || shared) && (
        <button
          onClick={() => onToggle("fullscreen")}
          className={`${common} bg-slate-800 hover:bg-emerald-700`}
        >
          <ArrowUpTrayIcon className="w-6 h-6" />
        </button>
      )}

      <div className="flex flex-auto gap-6 place-content-center items-center">
        <button
          onClick={() => onToggle("video", Object.values(users))}
          data-tooltip-id="visibility"
          data-tooltip-content={`${!visible ? "switch on" : "switch off"}`}
          className={`${common} bg-slate-800 hover:bg-emerald-700 relative`}
        >
          <VideoCameraIcon className="h-6 w-6" />
          {!visible && <CrossLine />}
        </button>
        <Tooltip id="visibility" />

        <button
          onClick={() => onToggle("audio")}
          data-tooltip-id="audio"
          data-tooltip-content={`${muted ? "unmute" : "mute"}`}
          className={`${common} bg-slate-800 hover:bg-emerald-700 relative`}
        >
          <MicrophoneIcon className="h-6 w-6" />
          {muted && <CrossLine />}
        </button>
        <Tooltip id="audio" />

        <button
          onClick={onLeave}
          data-tooltip-id="hangUp"
          data-tooltip-content="hang up"
          className={`${common} bg-red-600 hover:bg-red-500`}
        >
          <HangUpIcon className="h-7 w-7" />
        </button>
        <Tooltip id="hangUp" />

        <button
          onClick={() => onToggle("screen")}
          disabled={shared}
          className={`${common} ${
            screen
              ? "bg-emerald-600 hover:bg-emerald-500"
              : "bg-slate-800 hover:bg-emerald-700"
          }`}
          data-tooltip-id="shareScreen"
          data-tooltip-content="share your screen"
        >
          <ShareScreenIcon className="h-6 w-6" />
        </button>
        <Tooltip id="shareScreen" />

        <button
          data-tooltip-id="chat"
          data-tooltip-content="chat with everyone"
          onClick={() => onToggle("chat")}
          className={`${common} ${
            chat
              ? "bg-emerald-600 hover:bg-emerald-500"
              : "bg-slate-800 hover:bg-emerald-700"
          }`}
        >
          <ChatIcon className="w-6 h-6" />
        </button>
        <Tooltip id="chat" />
      </div>
      <ParticipantsCount
        onClick={() => onToggle("users")}
        count={Object.keys(streams).length + 1}
      />
    </>
  );
};

const common = "p-3 rounded-xl text-white";

const ParticipantsCount = ({ count, onClick }: any) => {
  return (
    <div className="inline-block relative">
      <button
        onClick={onClick}
        className="inline-block h-10 w-10 rounded-xl overflow-hidden bg-gray-100"
      >
        <svg
          className="h-full w-full text-gray-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      </button>
      <span className="place-content-center absolute top-0 right-0 block h-4 w-4 transform -translate-y-1/2 translate-x-1/2 rounded-full bg-amber-300 text-xs text-center text-black">
        {count}
      </span>
    </div>
  );
};
