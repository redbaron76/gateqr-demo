import Beep from "@/assets/beep.mp3";
import Counter from "@/components/Counter";
import Guest from "@/components/Guest";
import Invalid from "@/components/Invalid";
import Pausing from "@/components/Pausing";
import React from "react";
import Reset from "@/components/Reset";
import Sound from "@/components/Sound";
import TapLayer from "@/components/TapLayer";
import ViewFinder from "@/components/ViewFinder";
import Wrong from "@/assets/wrong.mp3";
import useMeasure from "react-use-measure";
import useScannerQr from "@/hooks/useScannerQr";
import useTranslate from "@/hooks/useTranslate";

const ScannerQr: React.FC = () => {
  const [ref, bounds] = useMeasure();
  const { bg, currentGuest, beepEl, wrongEl, canvasEl, videoEl, tapScanner } =
    useScannerQr(bounds);

  const { t } = useTranslate();

  return (
    <div
      ref={ref}
      className="relative w-full flex flex-col flex-grow justify-center items-center bg-black"
      onClick={tapScanner}
    >
      <div className="text-xs font-thin text-white uppercase animate-pulse">
        {t("ScannerQR.startingScanner")}
      </div>

      <audio ref={beepEl} src={Beep} preload="auto" className="hidden" />
      <audio ref={wrongEl} src={Wrong} preload="auto" className="hidden" />

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

      <ViewFinder />

      <canvas
        ref={canvasEl}
        width={bounds.width}
        height={bounds.height}
        className="absolute inset-0 object-cover w-full h-full"
      ></canvas>

      <Reset />
      <Sound />
      <Counter />

      <TapLayer />

      <Invalid bg={bg} />
      <Guest guest={currentGuest} bg={bg} />

      <Pausing />
    </div>
  );
};

export default ScannerQr;
