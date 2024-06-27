import React from "react";
import { RectReadOnly } from "react-use-measure";
import ScannerQR from "@/lib/scannerqr";
import { useGuestStore } from "@/stores/useGuestStore";

export default function useScannerQr({ width, height }: RectReadOnly) {
  const scanner = React.useRef<ScannerQR>();
  const videoEl = React.useRef<HTMLVideoElement>(null);
  const audioEl = React.useRef<HTMLAudioElement>(null);
  const canvasEl = React.useRef<HTMLCanvasElement>(null);
  const qrBoxEl = React.useRef<HTMLDivElement>(null);

  const TO = 3000;

  const {
    bg,
    sound,
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
    sound: store.sound,
    guests: store.guests,
    timeOut: store.timeOut,
    isPausing: store.isPausing,
    currentGuest: store.currentGuest,
    checkQrData: store.checkQrData,
    setGuest: store.setGuest,
    resetScannerState: store.resetScannerState,
    toggleScanner: store.toggleScanner,
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
      scanner.current = new ScannerQR(videoEl.current!, onScanSuccess, {
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
      });

      if (scanner.current) {
        setGuest("scanner", scanner.current);
        setGuest("sound", scanner.current.sound);
      }
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
    qrBoxEl,
    timeOut,
    currentGuest,
    counter: guests.length,
    isPausing,
    resetCounter,
    toggleScanner,
  };
}
