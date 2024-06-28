import React from "react";
import { RectReadOnly } from "react-use-measure";
import ScannerQR from "@/lib/scannerqr";
import { useGuestStore } from "@/stores/useGuestStore";

export default function useScannerQr({ width, height }: RectReadOnly) {
  const scanner = React.useRef<ScannerQR>();
  const videoEl = React.useRef<HTMLVideoElement>(null);
  const audioEl = React.useRef<HTMLAudioElement>(null);
  const canvasEl = React.useRef<HTMLCanvasElement>(null);

  const TO = 3000;

  const {
    bg,
    sound,
    timeOut,
    isPausing,
    currentGuest,
    checkQrData,
    setGuest,
    resetScannerState,
    tapScanner,
  } = useGuestStore((store) => ({
    bg: store.bg,
    sound: store.sound,
    timeOut: store.timeOut,
    isPausing: store.isPausing,
    currentGuest: store.currentGuest,
    checkQrData: store.checkQrData,
    setGuest: store.setGuest,
    resetScannerState: store.resetScannerState,
    tapScanner: store.tapScanner,
  }));

  const resetCounter = () => {
    return new Promise((resolve) => {
      const confirmed = confirm("Reset all the guest list?");
      if (confirmed) {
        setGuest("guests", []);
        resolve(confirmed);
      }
    });
  };

  React.useEffect(() => {
    const onScanSuccess = (data: string) => {
      if (data) checkQrData(data, TO);
    };

    if (width && height) {
      scanner.current = new ScannerQR(
        videoEl.current!,
        onScanSuccess,
        setGuest,
        {
          scanningInterval: 250,
          detectTimeout: 500,
          detectColor: "#ffcc00",
          detectWidth: 5,
          detectEnabled: false,
          vibrate: false,
          sound: sound,
          audio: audioEl.current!,
          canvas: canvasEl.current!,
          constraints: {
            audio: false,
            video: {
              facingMode: "environment",
              width,
              height,
            },
          },
        }
      );
    }

    return () => {
      if (scanner.current) {
        scanner.current?.destroy();
        resetScannerState();
        scanner.current = undefined;
        console.log("Unmounting...");
      }
    };
  }, [width, height]);

  return {
    bg,
    audioEl,
    videoEl,
    canvasEl,
    timeOut,
    currentGuest,
    isPausing,
    resetCounter,
    tapScanner,
  };
}
