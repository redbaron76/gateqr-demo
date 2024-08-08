import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TranslateProps = {
  currentLocale: string;
};

interface TranslateStore extends TranslateProps {
  setCurrentLocale: (locale: string) => void;
  setTranslate: (
    key: keyof TranslateProps,
    value: TranslateProps[typeof key]
  ) => void;
}

export const useTranslateStore = create<TranslateStore>()(
  immer((set) => ({
    currentLocale: "en",

    setCurrentLocale: (locale) => {
      set({ currentLocale: locale });
    },

    setTranslate: (key, value) => {
      set({ [key]: value });
    },
  }))
);
