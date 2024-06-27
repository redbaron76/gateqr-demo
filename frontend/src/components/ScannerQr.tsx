import Beep from "@/assets/beep.mp3";
import Counter from "./Counter";
import Guest from "@/components/Guest";
import Invalid from "@/components/Invalid";
import Pausing from "@/components/Pausing";
import QrFrame from "@/assets/qr-frame.svg";
import React from "react";
import Reset from "@/components/Reset";
import Sound from "@/components/Sound";
import useMeasure from "react-use-measure";
import useScannerQr from "@/hooks/useScannerQr";

const ScannerQr: React.FC = () => {
  const [ref, bounds] = useMeasure();
  const {
    bg,
    currentGuest,
    audioEl,
    qrBoxEl,
    canvasEl,
    videoEl,
    toggleScanner,
  } = useScannerQr(bounds);

  React.useEffect(() => {
    console.log();
  }, [bg]);

  return (
    <div
      ref={ref}
      className="relative w-full flex flex-col flex-grow justify-center items-center bg-black"
      onClick={toggleScanner}
    >
      <div className="text-xs font-thin text-white animate-pulse">
        Starting scanner...
      </div>

      <audio ref={audioEl} src={Beep} preload="auto" className="hidden" />

      <video
        ref={videoEl}
        preload="none"
        width={bounds.width}
        height={bounds.height}
        autoPlay={true}
        muted={true}
        playsInline={true}
        controls={false}
        className="absolute inset-0 object-cover w-full h-full"
      ></video>

      <div
        ref={qrBoxEl}
        className="absolute !top-1/2 !-translate-y-1/2 !left-1/2 !-translate-x-1/2 !w-56 !h-56"
      >
        <img src={QrFrame} alt="qr-frame" className="w-56 h-56" />
      </div>

      <canvas
        ref={canvasEl}
        width={bounds.width}
        height={bounds.height}
        className="absolute inset-0 object-cover w-full h-full"
      ></canvas>

      <Invalid bg={bg} />
      <Guest guest={currentGuest} bg={bg} />

      <Reset />
      <Sound />
      <Counter />
      <Pausing />
    </div>
  );
};

export default ScannerQr;
