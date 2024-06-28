import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";

import React from "react";
import { useGuestStore } from "@/stores/useGuestStore";

const Sound: React.FC = () => {
  const { bg, sound, scanner, setGuest } = useGuestStore((store) => ({
    bg: store.bg,
    sound: store.sound,
    scanner: store.scanner,
    setGuest: store.setGuest,
  }));

  if (bg !== "bg-black") return null;

  return (
    <button
      className="absolute top-6 right-6"
      onClick={() => {
        scanner?.toggleSound();
        setGuest("sound", !sound);
      }}
    >
      {sound ? (
        <SpeakerWaveIcon className="size-8 text-white" />
      ) : (
        <SpeakerXMarkIcon className="size-8 text-white" />
      )}
    </button>
  );
};

export default Sound;
