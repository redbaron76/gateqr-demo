import QrFrame from "@/assets/qr-frame.svg";
import React from "react";
import { useGuestStore } from "@/stores/useGuestStore";

const ViewFinder: React.FC = () => {
  const { scanner, isScanning } = useGuestStore((store) => ({
    scanner: store.scanner,
    isScanning: store.isScanning,
  }));

  if (!scanner || !isScanning) return null;

  return (
    <div className="absolute !top-1/2 !-translate-y-1/2 !left-1/2 !-translate-x-1/2 !w-64 !h-64">
      <img src={QrFrame} alt="qr-frame" className="w-64 h-64" />
    </div>
  );
};

export default ViewFinder;
