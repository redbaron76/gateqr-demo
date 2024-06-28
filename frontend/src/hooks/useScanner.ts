import QrScanner from "qr-scanner";
import React from "react";
import { useGuestStore } from "@/stores/useGuestStore";

export default function useScanner() {
  const scanner = React.useRef<QrScanner>();
  const videoEl = React.useRef<HTMLVideoElement>(null);
  const qrBoxEl = React.useRef<HTMLDivElement>(null);

  const isScanning = React.useRef<boolean>(false);

  const TO = 3000;

  const {
    bg,
    guests,
    timeOut,
    isPausing,
    currentGuest,
    checkQrData,
    setGuest,
    resetScannerState,
    toggleScanner,
  } = useGuestStore((store) => ({
    bg: store.bg,
    guests: store.guests,
    timeOut: store.timeOut,
    isPausing: store.isPausing,
    currentGuest: store.currentGuest,
    checkQrData: store.checkQrData,
    setGuest: store.setGuest,
    resetScannerState: store.resetScannerState,
    toggleScanner: store.tapScanner,
  }));

  const onScanSuccess = (result: QrScanner.ScanResult) => {
    if (result?.data) {
      checkQrData(result.data, () => scanner.current!.start(), TO);
      scanner.current!.stop();
    }
  };

  const resetCounter = () => {
    if (confirm("Reset counter?")) {
      setGuest("guests", []);
    }
  };

  const scannerToggle = () => {
    toggleScanner(() => scanner.current!.start(), TO);
  };

  React.useEffect(() => {
    const runScanner = async () => {
      scanner.current = new QrScanner(videoEl.current!, onScanSuccess, {
        maxScansPerSecond: 2,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: false,
        overlay: qrBoxEl.current!,
        returnDetailedScanResult: true,
      });

      await scanner.current?.start();
      isScanning.current = true;
    };

    runScanner();

    return () => {
      if (isScanning.current) {
        scanner.current?.destroy();
        resetScannerState();
        isScanning.current = false;
        scanner.current = undefined;
        console.log("Unmounting...");
      }
    };
  }, []);

  return {
    bg,
    videoEl,
    qrBoxEl,
    timeOut,
    currentGuest,
    counter: guests.length,
    isPausing,
    isScanning: isScanning.current,
    resetCounter,
    scannerToggle,
  };
}
