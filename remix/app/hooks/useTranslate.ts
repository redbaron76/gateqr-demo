// import React from "react";
import i18ssr from "@/libs/i18ssr";
import { useTranslateStore } from "@/stores/useTranslateStore";

export default function useTranslate(initLocale?: string) {
  i18ssr.setInitialLocale(initLocale);

  const { currentLocale, setCurrentLocale } = useTranslateStore((store) => ({
    currentLocale: store.currentLocale,
    setCurrentLocale: store.setCurrentLocale,
  }));

  // on change locale...
  const setLocale = (locale: string) => {
    setCurrentLocale(locale);
    i18ssr.setLocale(locale);
  };

  return {
    ...i18ssr,
    setLocale,
    currentLocale,
  };
}
