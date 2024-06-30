import { CursorArrowRaysIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useGuestStore } from "@/stores/useGuestStore";

const TapLayer: React.FC = () => {
  const { scanner, isScanning } = useGuestStore((store) => ({
    scanner: store.scanner,
    isScanning: store.isScanning,
  }));

  if (!scanner || isScanning) return null;

  return (
    <>
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      <div className="absolute !top-1/2 !-translate-y-1/2 !left-1/2 !-translate-x-1/2 !w-64 !h-64">
        <div className="flex flex-col justify-center items-center gap-4 text-white">
          <CursorArrowRaysIcon className="text-base text-white animate-pulse" />
          <span className="text-sm uppercase animate-pulse">
            Tap to start scanning
          </span>
        </div>
      </div>
    </>
  );
};

export default TapLayer;
