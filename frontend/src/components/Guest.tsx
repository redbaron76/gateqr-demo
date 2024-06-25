import {
  CheckBadgeIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Guest as CurrentGuest, ScanBackground } from "@/stores/useGuestStore";

import React from "react";

type Props = {
  bg: ScanBackground;
  guest: CurrentGuest;
};

const Guest: React.FC<Props> = ({ bg, guest }) => {
  if (bg !== "bg-green-500" && bg !== "bg-amber-500") return null;

  // remove "provider" from Guest
  const entries = Object.entries(guest).filter(([key]) => key !== "provider");

  return (
    <div
      className={`absolute inset-0 flex flex-col flex-1 justify-center gap-2 px-8 ${bg}`}
    >
      {bg === "bg-green-500" && (
        <div className="flex justify-center">
          <CheckBadgeIcon className="size-32 text-amber-400" />
        </div>
      )}

      {bg === "bg-amber-500" && (
        <div className="flex flex-col items-center gap-2 p-4 mb-10 rounded-2xl bg-white">
          <ExclamationTriangleIcon className="size-12 text-red-500" />
          <div className="font-bold text-xl break-words uppercase text-center text-red-500">
            Codice già scansionato!
          </div>
        </div>
      )}

      {entries.map(([key, value], i) => (
        <div key={`${key}-${i}`} className="text-white">
          <span className="">{key}</span>
          <div className="font-bold text-2xl break-words">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default Guest;