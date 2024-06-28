import { CursorArrowRippleIcon } from "@heroicons/react/24/solid";
import QrFrame from "@/assets/qr-frame.svg";
import React from "react";
import { useGuestStore } from "@/stores/useGuestStore";

const ViewFinder: React.FC = () => {
  const { scanner, isScanning } = useGuestStore((store) => ({
    scanner: store.scanner,
    isScanning: store.isScanning,
  }));

  if (!scanner) return null;

  return (
    <div className="absolute !top-1/2 !-translate-y-1/2 !left-1/2 !-translate-x-1/2 !w-64 !h-64">
      {isScanning ? (
        <img src={QrFrame} alt="qr-frame" className="w-64 h-64" />
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 text-white">
          <CursorArrowRippleIcon className="text-base text-white animate-pulse" />
          <span className="text-sm uppercase animate-pulse">
            Tap to start scanning
          </span>
        </div>
      )}
    </div>
  );
};

export default ViewFinder;
