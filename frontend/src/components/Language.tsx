import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GlobeAltIcon } from "@heroicons/react/24/outline";
import React from "react";
import { log } from "@/libs/utils";
import useTranslate from "@/hooks/useTranslate";

const Language: React.FC = () => {
  const { t, currentLocale, getLocales, setLocale } = useTranslate();

  log(getLocales(), "getLocales");

  React.useEffect(() => {
    log(currentLocale, "currentLocale");
  }, [currentLocale]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center gap-1">
        <GlobeAltIcon className="w-5 h-5" />
        <span className="uppercase">{currentLocale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("label.showIn")}:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {getLocales().map(({ key, name }) => (
          <DropdownMenuItem
            key={key}
            className={`${key === currentLocale ? "font-bold" : ""}`}
            onClick={() => setLocale(key)}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Language;
