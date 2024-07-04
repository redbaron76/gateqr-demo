import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { ScanBackground } from "@/stores/useGuestStore";
import useTranslate from "@/hooks/useTranslate";

type Props = {
  bg: ScanBackground;
};

const Invalid: React.FC<Props> = ({ bg }) => {
  const { t } = useTranslate();

  if (bg !== "bg-red-500") return null;

  return (
    <div
      className={`absolute inset-0 flex flex-col justify-center items-center ${bg}`}
    >
      <div className="flex flex-col items-center gap-4">
        <ExclamationTriangleIcon className="size-12 text-amber-400" />
        <div className="font-bold text-2xl text-white break-words uppercase">
          {t("Invalid.notAllowed")}
        </div>
      </div>
    </div>
  );
};

export default Invalid;
