import { Button } from "@/components/ui/button";
import Guest from "@/components/Guest";
import Invalid from "@/components/Invalid";
import { PauseCircleIcon } from "@heroicons/react/24/outline";
import QrFrame from "@/assets/qr-frame.svg";
import { UserIcon } from "@heroicons/react/24/solid";
import { createFileRoute } from "@tanstack/react-router";
import useScanner from "@/hooks/useScanner";

export const Route = createFileRoute("/scanner")({
  component: Scanner,
});

function Scanner() {
  const {
    bg,
    counter,
    currentGuest,
    isPausing,
    videoEl,
    qrBoxEl,
    resetCounter,
    scannerToggle,
  } = useScanner();

  return (
    <div
      className="relative w-full flex flex-col flex-grow justify-center items-center bg-black"
      onClick={scannerToggle}
    >
      <video
        ref={videoEl}
        preload="none"
        className="absolute inset-0 object-cover w-full h-full"
      ></video>
      <div
        ref={qrBoxEl}
        className="absolute !top-1/2 !-translate-y-1/2 !left-1/2 !-translate-x-1/2 !w-56 !h-56"
      >
        <img src={QrFrame} alt="qr-frame" className="w-56 h-56" />
      </div>

      <div className="text-xs font-thin text-white">Starting scanner...</div>

      <Invalid bg={bg} />
      <Guest guest={currentGuest} bg={bg} />

      {isPausing && (
        <PauseCircleIcon className="absolute bottom-5 size-12 text-white animate-pulse" />
      )}

      <div className="absolute bottom-5 right-5 border-4 border-white rounded-2xl px-2 min-w-14 min-h-14 flex justify-center items-center gap-1">
        <UserIcon className="size-5 text-white" />
        <span className="text-white text-xl font-bold">{counter}</span>
      </div>
      {counter > 0 && (
        <Button
          variant="link"
          onClick={resetCounter}
          className="absolute bottom-5 left-5 text-white"
        >
          Reset list
        </Button>
      )}
    </div>
  );
}
