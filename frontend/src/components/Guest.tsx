import { Guest as CurrentGuest, ScanBackground } from "@/stores/useGuestStore";
import {
  ExclamationTriangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

import React from "react";
import { tsToDate } from "@/lib/utils";

type Props = {
  bg: ScanBackground;
  guest: CurrentGuest;
};

const Guest: React.FC<Props> = ({ bg, guest }) => {
  if (bg !== "bg-green-500" && bg !== "bg-amber-500") return null;

  // remove "_provider" and "_id" from Guest
  const entries = Object.entries(guest)
    .filter(([key]) => key !== "_provider")
    .filter(([key]) => key !== "_id");

  return (
    <div
      className={`absolute inset-0 flex flex-col flex-1 justify-center gap-2 px-8 ${bg}`}
    >
      {bg === "bg-green-500" && (
        <div className="flex justify-center">
          <ShieldCheckIcon className="size-32 text-amber-400" />
        </div>
      )}

      {bg === "bg-amber-500" && (
        <div className="flex flex-col items-center gap-2 p-4 mb-10 rounded-2xl bg-white">
          <ExclamationTriangleIcon className="size-12 text-red-500" />
          <div className="font-bold text-xl break-words uppercase text-center text-red-500">
            Code already checked!
          </div>
        </div>
      )}

      {entries.map(([key, value], i) => {
        let size = "text-2xl";
        let label = key;

        if (key === "_checkTime") {
          label = "Check time";
          value = tsToDate(value);
          size = "text-lg";
        }

        if (value && value.length > 20) size = "text-lg";

        return (
          <div
            key={`${key}-${i}`}
            className={`text-white ${key === "_checkTime" ? "mt-4" : ""}`}
          >
            <span className="">{label}</span>
            <div className={`font-bold break-words ${size}`}>{value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Guest;
