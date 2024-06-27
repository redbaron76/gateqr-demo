import { PauseCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useGuestStore } from "@/stores/useGuestStore";

const Pausing: React.FC = () => {
  const isPausing = useGuestStore((store) => store.isPausing);

  if (!isPausing) return null;

  return (
    <div className="absolute bottom-4 left-5 flex items-center gap-2 animate-pulse">
      <PauseCircleIcon className=" size-16 text-white" />
      <span className="text-white text-xs">Tap to resume</span>
    </div>
  );
};

export default Pausing;
