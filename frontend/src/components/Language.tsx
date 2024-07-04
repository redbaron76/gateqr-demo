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
import languages from "@/i18n/languages";
import useTranslate from "@/hooks/useTranslate";

const Language: React.FC = () => {
  const { t, lang, changeLanguage } = useTranslate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-center items-center gap-1">
        <GlobeAltIcon className="w-5 h-5" />
        <span className="uppercase">{lang}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{t("label.showIn")}:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.keys(languages).map((lng) => (
          <DropdownMenuItem
            key={lng}
            className={`${lang === lng ? "font-bold" : ""}`}
            onClick={() => changeLanguage(lng)}
          >
            {languages[lng].nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Language;
