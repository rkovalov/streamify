import { MicrophoneIcon, PhoneXMarkIcon } from "@heroicons/react/24/solid";
import { CrossLine } from "../cross-line";

export const HostControlPanel = ({
  isMuted,
  onMutePeer,
  onRemovePeer,
}: {
  isMuted: boolean;
  onMutePeer: () => void;
  onRemovePeer: () => void;
}) => (
  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden group-hover:block opacity-50">
    <button
      onClick={onMutePeer}
      disabled={isMuted}
      className="p-2 rounded-l-lg border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 relative"
    >
      <MicrophoneIcon className="h-4 w-4" />
      {isMuted && <CrossLine pos={{ top: "4", left: "4" }} />}
    </button>

    <button
      onClick={onRemovePeer}
      className="p-2 rounded-r-lg border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 relative"
    >
      <PhoneXMarkIcon className="h-4 w-4" />
    </button>
  </div>
);
