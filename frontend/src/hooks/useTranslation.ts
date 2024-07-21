import React from "react";
import i18ssr from "@/libs/i18ssr";

export default function useTranslation(initLocale?: string) {
  i18ssr.setInitialLocale(initLocale);

  // set the current locale
  const [currentLocale, setCurrentLocale] = React.useState(
    initLocale || i18ssr.currentLocale
  );

  // on change locale...
  const setLocale = (locale: string) => {
    setCurrentLocale(() => {
      i18ssr.setLocale(locale);
      return locale;
    });
  };

  return {
    ...i18ssr,
    setLocale,
    currentLocale,
  };
}
